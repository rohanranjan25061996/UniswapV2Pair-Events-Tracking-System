const ether = require('ethers')
const fetchEventData = async(eventName, provider, contractAddress, abi) => {
    try{
            const iface = new ether.utils.Interface(abi)
            const events = iface.events
            const allEventPrototype = Object.keys(events);
            let indexKey = -1
            allEventPrototype.forEach((item, index) => {
                if(events[item].name === eventName){
                    indexKey = index
                    return
                }
            })
            if(indexKey !== -1){
                const blockNumber = await provider.getBlockNumber()
                const eventTopic = ether.utils.keccak256(ether.utils.
                    toUtf8Bytes(allEventPrototype[indexKey]));
                const logs = await provider.getLogs({
                    address: contractAddress,
                    topics: [
                        eventTopic
                    ],
                    fromBlock: blockNumber - 10000,
                    toBlock: 'latest'
                });
                logs.sort((a,b) => (a.blockNumber < b.blockNumber) ? 1 : 
                ((b.blockNumber < a.blockNumber) ? -1 : 0))
                return logs
            }else{
                throw new Error('InvalidEventName, Please pass valid event Name')
            }
    }catch(e){
        throw new Error(e.message || 'Oops something went wrong')
    }
}

module.exports = fetchEventData