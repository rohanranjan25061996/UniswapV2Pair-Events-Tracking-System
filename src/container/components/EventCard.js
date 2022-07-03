import React from "react";
import css from "../styles/Event.module.css"

const concatStringAddress = (para) => {
    let adr = para.split("")
    let start = adr.slice(0, 20).join("")
    let end = adr.slice(-10).join("")
    let string = `${start}...${end}`
    return string;
}

const EventCard = (props) => {

    const {data, onClick} = props
    return(
        <>
        {data && data.map((item) => <div className={css.card}>
            <p>Tx Hash: {concatStringAddress(item.transactionHash)}</p>
            <p>Sender: {item.sender}</p>
            <p>To: {item.to}</p>
            <p>Amount0 In: {item.amount0In}</p>
            <p>Amount0 Out: {item.amount0Out}</p>
            <p>Amount1 In: {item.amount1In}</p>
            <p>Amount1 Out: {item.amount1Out}</p>
            <button onClick={() => onClick(item.transactionHash)}>Tx Block</button>
        </div>)}
        </>
    )
}

export default EventCard