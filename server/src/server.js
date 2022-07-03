require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const ether = require('ethers');
const ABI = require('./config');
const listenEvents = require("./listenEvents");
const session  = require('express-session');
const PROVIDER_LINK = process.env.INFURA_PROVIDER_URL || 'https://eth-rinkeby.alchemyapi.io/v2/5SFyy1JrWYiMdQq4iAZPNQeWZFFdytTm'
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0x03E6c12eF405AC3F642B9184eDed8E1322de1a9e'
const PORT = process.env.PORT || 8080
const cookeies = require("cookie-parser")

app.use( cors() );

app.use(express.json());

// name: 'user_authentication',
// resave: true,
// saveUninitialized: true,
// cookie: { secure: false, sameSite: true}

app.use(cookeies())
app.use(session({
    name: 'user_authentication',
    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: false }
}))

const routes = require('./routes');


const initServer = async () => {
    try{
        const provider = new ether.providers.JsonRpcProvider(PROVIDER_LINK);
        const contract = new ether.Contract(CONTRACT_ADDRESS, ABI, provider)
        listenEvents(provider, CONTRACT_ADDRESS, ABI)
        routes(app, provider, CONTRACT_ADDRESS, ABI)
        app.listen(PORT, () => {
            console.log(`====== Start listening on port ${PORT} ========`);
        })
    }catch(e){
        console.log("============error=========", e)
    }
}



initServer()