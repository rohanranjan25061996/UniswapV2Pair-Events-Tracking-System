import React, { useEffect, useState } from "react"
import { getEventData } from "../../api"
import css from "../styles/Event.module.css"
import EventCard from "./EventCard"

const perPage = 15;

const rinkebyURL = process.env.REACT_APP_RINKEBY_TX_URL || 'https://rinkeby.etherscan.io/tx/'

const EventDetails = (props) => {

    const [allData, setAllData] = useState([])
    const [pageData, setPageData] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const [isLoading, setLoading] = useState(false)
    const [valueX, setValueX] = useState(1)

    useEffect(() => {
        getAllEventData()
    }, [])

    useEffect(() => {
        if(allData.length > 0){
            paginationData()
        }
    }, [allData, valueX])

    const getAllEventData = () => {
        setLoading(true)
        getEventData('Swap')
        .then((res) => {
            setAllData(res.data.result);
            setTotalResult(res.data.count);
            setLoading(false)
        })
        .catch((e) => {
            setLoading(false)
        })
    }

    const paginationData = () => {
        let start = (valueX - 1) * perPage
        let end = start + perPage
        let temp = allData.slice(start, end)
        setPageData(temp)
    }

    const next = () => {
        if((valueX * perPage) <= totalResult){
            setValueX((prev) => prev + 1)
        }
    }

    const prev = () => {
        if(valueX !== 1){
            setValueX((prev) =>  prev - 1)
        }
    }

    const onClick = (txHash) => {
        window.open(`${rinkebyURL}${txHash}`, '_blank')
    }

    return(
        <>
        <div className={css.details}>Swap Event Data</div>
        {isLoading && pageData.length === 0 && <h3>Loding...</h3>}
        {!isLoading && pageData.length > 0 &&  <div className={css.container}>
            <EventCard data = {pageData} onClick = {onClick} />
        </div>}
        <div className={css.handel}>
           <div className={css.handel_inside}>
            <div className={valueX === 1 ? 
            `${css.handel_card} ${css.handel_opactiy}` : `${css.handel_card}`} onClick={valueX === 1 ? null : prev}>Prev</div>
            <div className={valueX * perPage >= totalResult ? 
            `${css.handel_card} ${css.handel_opactiy}` : `${css.handel_card}`} onClick={valueX * perPage >= totalResult ? null : next}>Next</div>
           </div>
        </div>
        </>
    )
}

export default EventDetails