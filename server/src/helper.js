const refineData = (data, iFace) => {
    let result = []
    data.forEach((item) => {
        let obj = {}
        const {transactionHash} = item
        const parseData = iFace.parseLog(item);
        const {args} = parseData
        const {sender, to, amount0In : am0In, amount1In : am1In, amount0Out : am0Out, amount1Out: am1Out} = args
        obj = {
            sender,
            to,
            amount0In: am0In.toString(),
            amount0Out: am0Out.toString(),
            amount1In: am1In.toString(),
            amount1Out: am1Out.toString(),
            transactionHash
        }
        result.push(obj)
    })
    return result
}

module.exports = {
    refineData
}