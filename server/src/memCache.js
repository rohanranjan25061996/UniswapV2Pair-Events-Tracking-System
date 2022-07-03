const memJS = require('memjs');
const memJSClient = memJS.Client.create()

const memCahceInstace = () =>{
    return memJSClient
}

module.exports = memCahceInstace