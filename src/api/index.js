import axios from "axios"
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'

export const generatetNounce = async () => {
    try{
        const url = `${BASE_URL}/nonce`
        const response = await axios.get(url);
        return response
    }catch(error){
        Promise.reject(error)
    }
}

export const verifyUser = async (payLoad) => {
    try{
        const url = `${BASE_URL}/verify`
        const response = await axios.post(url, payLoad)
        return response
    }catch(error){
        Promise.reject(error)
    }
}

export const getEventData = async (eventName) => {
    try{
        const url = `${BASE_URL}/eventdata/${eventName}`
        const response = await axios.get(url)
        return response
    }catch(error){
        Promise.reject(error)
    }
}