const memCahceInstace = require('./memCache')
const fetchEventData = require('./fetchEventData')
const {refineData} = require('./helper')
const ethers = require('ethers')

const updateSwapEventCache = async (provider, contractAddress, abi) => {
    fetchEventData('Swap', provider, contractAddress, abi)
    .then((response) => {
        const iface = new ethers.utils.Interface(abi);
        const result = refineData(response, iface)
        const cache = memCahceInstace();
        cache.set('Swap', JSON.stringify(result), {expires:6000000})
    })
    .catch((error) => {
        error = error.toString().split(":")
        console.log("=======error in updateSwapEventCache", error[1])
    })
}

const updateSyncEventCache = async (provider, contractAddress, abi) => {
    // fetchEventData('Sync', provider, contractAddress, abi)
    // .then((response) => {
    //     const iface = new ethers.utils.Interface(abi);
    //     const result = refineData(response, iface)
    //     const cache = memCahceInstace();
    //     cache.set('Sync', JSON.stringify(result), {expires:600000})
    // })
    // .catch((error) => {
    //     error = error.toString().split(":")
    //     console.log("=======error in updateSyncEventCache", error[1])
    // })
}

const updateApprovalEventCache = async (provider, contractAddress, abi) => {
    // fetchEventData('Approval', provider, contractAddress, abi)
    // .then((response) => {
    //     const iface = new ethers.utils.Interface(abi);
    //     const result = refineData(response, iface)
    //     const cache = memCahceInstace();
    //     cache.set('Approval', JSON.stringify(result), {expires:600000})
    // })
    // .catch((error) => {
    //     error = error.toString().split(":")
    //     console.log("=======error in updateApprovalEventCache", error[1])
    // })
}

const updateTransferEventCache = async (provider, contractAddress, abi) => {
    // fetchEventData('Transfer', provider, contractAddress, abi)
    // .then((response) => {
    //     const iface = new ethers.utils.Interface(abi);
    //     const result = refineData(response, iface)
    //     const cache = memCahceInstace();
    //     cache.set('Transfer', JSON.stringify(result), {expires:6000000})
    // })
    // .catch((error) => {
    //     error = error.toString().split(":")
    //     console.log("=======error in updateTransferEventCache", error[1])
    // })
}

module.exports = {
    swapEventCache: updateSwapEventCache,
    syncEventCache: updateSyncEventCache,
    approvalEventCache: updateApprovalEventCache,
    transferEventCache: updateTransferEventCache
}