import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import Login from "./container/components/Login";
import {generatetNounce, verifyUser} from "./api/index"
import {SiweMessage} from "siwe"
import EventDetails from "./container/components/EventDetails";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [nonce, setNonce] = useState(null)
  const [userAddress, setUserAddress] = useState(null)

  useEffect(() => {
    if(!nonce){
     
    }
  }, [])

  useEffect(() => {
    if(nonce && userAddress){
        generateNewMessage()
    }
  }, [nonce, userAddress])

  const generateNewMessage = async () => {
    const {chainId} = await provider.getNetwork()
    const newMessage = new SiweMessage({
      domain,
      address: await signer.getAddress(),
      statement: 'Sign in with Metamask',
      uri: origin,
      version: '1',
      chainId: chainId,
      nonce: nonce
    })
    const message = newMessage.prepareMessage();
    const signature = await signer.signMessage(message);
    const payload = {
      message,
      signature
    }
    verifyUser(payload)
    .then((res) => {
      setIsAuth(true)
    })
    .catch((e) => {
      setIsAuth(false)
    })
  }

  const getNonce = async () => {
    generatetNounce()
    .then((res) => {
      setNonce(res.data)
    })
    .catch((error) => {

    })
  }

  const connectWallet = async () => {
    await getNonce()
    provider.send('eth_requestAccounts', [])
    .then((res) => {
      setUserAddress(res[0])
    })
    .catch((error) => {
      console.log("====user====reject to login======", error)
    })
  }
  return (
    <>
    {!isAuth ? <Login connectWallet = {connectWallet} /> : <EventDetails />}
    </>
  );
}

export default App;
