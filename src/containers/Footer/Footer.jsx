import React from "react";
import './Footer.css'

const Footer = ({changeRoute}) =>{
    return (
        <div className="footer main">
            <div onClick={()=>{changeRoute('about')}} className="footer container">
            <p  className="footer link">About</p>
            </div>
        </div>
    );
}

export default Footer;