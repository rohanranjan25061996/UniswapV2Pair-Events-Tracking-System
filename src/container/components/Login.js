import React from "react";
import css from "../styles/login.module.css"
import MetamaskImage from "../../assets/metamask.png"

const Login = (props) => {
    const {connectWallet} = props
    return(
        <>
        <div className={css.container}>
            <div className={css.box}>
                <h3>Sign In</h3>
                <img src={MetamaskImage} alt="Metamask_Image" width="200px" height='100px'
                onClick={ connectWallet } />
            </div>
        </div>
        </>
    )
}

export default Login