const ether = require('ethers');
const {swapEventCache, approvalEventCache, transferEventCache, syncEventCache} = require('./updateCache')

const listenEvent = (provider, contractAddress, abi) => {
    const swapFilter = {
        address: contractAddress,
        topic: [
            ether.utils.id('Swap(address,uint256,uint256,uint256,uint256,address)')
        ]
    }

    const syncFilter = {
        address: contractAddress,
        topic: [
            ether.utils.id('Sync(uint112,uint112)')
        ]
    }

    const approvalFilter = {
        address: contractAddress,
        topic: [
            ether.utils.id('Approval(address,address,uint256)')
        ]
    }

    const transferFilter = {
        address: contractAddress,
        topic: [
            ether.utils.id('Transfer(address,address,uint256)')
        ]
    }
    provider.on(swapFilter, async() => {
        console.log("========swapFilter called=======")
        await swapEventCache(provider, contractAddress, abi)
    })

    provider.on(syncFilter, async() => {
        console.log("========syncFilter called=======")
        await syncEventCache(provider, contractAddress, abi)
    })

    provider.on(approvalFilter, async() => {
        console.log("========approvalFilter called=======")
        await approvalEventCache(provider, contractAddress, abi)
    })

    provider.on(transferFilter, async() => {
        console.log("========transferFilter called=======")
        await transferEventCache(provider, contractAddress, abi)
    })
}

module.exports = listenEvent