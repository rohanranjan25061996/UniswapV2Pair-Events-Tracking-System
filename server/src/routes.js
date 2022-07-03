const {refineData} = require('./helper')
const memCahceInstace = require('./memCache')
const fetchEventData = require('./fetchEventData');
const ethers = require('ethers')
const {generateNonce, ErrorTypes, SiweMessage} = require('siwe')

let sess

const routes = (app, provider, contractAddress, abi) => {

    app.get('/nonce', async (req, res) => {
        try{
            sess = req.session
            sess.nonce = generateNonce();
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send(sess.nonce)
        }catch(e){
            return res.status(500).json({message: e.message || 'Oops Something went wrong'})
        }
    })

    app.post('/verify', async (req, res) => {
        try{
            if (!req.body.message) {
                res.status(422).json({ message: 'Expected prepareMessage object as body.' });
                return;
            }
            const message = new SiweMessage(req.body.message);
            const fields = await message.validate(req.body.signature);
            if (fields.nonce !== sess.nonce) {
                res.status(422).json({
                    message: `Invalid nonce.`,
                });
                return;
            }
            sess.siwe = fields;
            sess.cookie.expires = new Date(fields.expirationTime);
            sess.save(() => res.status(200).end());
        }catch(e){
            sess.siwe = null;
            sess.nonce = null;
            console.error(e);
            switch (e) {
                case ErrorTypes.EXPIRED_MESSAGE: {
                    sess.save(() => res.status(440).json({ message: e.message }));
                    break;
                }
                case ErrorTypes.INVALID_SIGNATURE: {
                    sess.save(() => res.status(422).json({ message: e.message }));
                    break;
                }
                default: {
                    sess.save(() => res.status(500).json({ message: e.message }));
                    break;
                }
            }
        }
    })

    app.get("/eventdata/:eventName",middleWareFunc, async(req, res) => {
        try{
            if (!sess.siwe) {
                res.status(401).json({ message: 'You have to first sign_in with metamask' });
                return;
            }
            const {eventName} = req.params
            const iface = new ethers.utils.Interface(abi);
            fetchEventData(eventName, provider, contractAddress, abi)
            .then((resp) => {
                const result = refineData(resp, iface)
                const cahche = memCahceInstace();
                cahche.set(eventName, JSON.stringify(result), {expires: 6000})
                return res.status(200).json({result: result, count: result.length})
            })
            .catch((e) => {
                e = e.toString().split(":")
                return res.status(400).json({message: e[1]})
            })
        }catch(e){
            return res.status(500).json({message: e.message || 'Oops Something went wrong'})
        }
    })
}

const middleWareFunc = async (req, res, next) => {
    if (!sess.siwe) {
        res.status(401).json({ message: 'You have to first sign_in with metamask' });
        return;
    }
    const cache = memCahceInstace();
    const {eventName} = req.params
    cache.get(eventName, (err, data) => {
        if(data){
            return res.status(200).json({result: JSON.parse(data), count: JSON.parse(data).length})
        }else{
            next();
        }
        if(err){
            next();
        }
    });
}

module.exports = routes