import React from "react";
import './Loading.css'

const Loading = () =>{
    return (
        <div className="loading main">
            <img className="loading img" src="https://vineethraik.github.io/initial-web-dev/res/image/smartbrain/logo.png" alt="" />
            <p className="loading text">Loading ...</p>
        </div>
    );
}

export default Loading;