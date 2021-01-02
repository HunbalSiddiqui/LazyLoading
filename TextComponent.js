import React,{Fragment} from 'react'
import Ink from "react-ink";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { faAndroid } from '@fortawesome/free-brands-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import ContentLoader, { Facebook, BulletList } from "react-content-loader";

function TextComponent(props) {
    const [langFlag, setlangFlag] = useState(false)
    useEffect(() => {
        // console.log("TextComponent",localStorage.getItem('lang'),props.language)
        // if(localStorage.getItem('lang'))
        // {
            setlangFlag(true)                
        var delay = document.querySelector('.delay')
            setTimeout(() => {
                if(delay)
                {
            delay.style.opacity = 1
                }
            }, 500);
        // }
        return () => {
            // cleanup
        }
    }, [props.language,localStorage.getItem('lang')])
    return(
    langFlag  ?
    <Fragment className="delay" style={{opacity:"0"}}>
        {/* Heading */}
        <div className="mb-50"><span style={{fontWeight:"bold", fontSize:"30px"}}>Paydizer</span>.com</div>
        {/* Tags */}
<div className="mt-10 " style={{fontWeight:600, color:"#333", fontFamily:"open sans",opacity:"0"}}>

<div className="mb-5"><FontAwesomeIcon icon={faQrcode} className="mr-10" style={{width:"20px", height:"20px"}} /><span style={{position:"absolute"}}>Kontaktlos bezahlen mit QR Code</span></div>

<div className="mb-5"><FontAwesomeIcon icon={faWifi} className="mr-10" style={{background:"#0F8CE9", color:"#fff", padding:"3px", borderRadius:"5px", width:"20px", height:"20px"}} /><span style={{position:"absolute"}}>Ohne Internetverbindung bezahlen</span></div>

<div className="mb-5"><FontAwesomeIcon icon={faStore} className="mr-10" style={{color:"rgb(131, 96, 195)", width:"20px", height:"20px"}} /><span style={{position:"absolute"}}>Shops in der Nähe finden</span></div>

<div className="mb-5"><FontAwesomeIcon icon={faGift} className="mr-10" style={{width:"20px", height:"20px", color:"#FF385C"}} /><span style={{position:"absolute"}}>Geschenkarten an Freunde senden</span></div>

<div className="mb-5"><FontAwesomeIcon icon={faUniversity} className="mr-10" style={{width:"20px", height:"20px", color:localStorage.getItem("storeColor")}} /><span style={{position:"absolute"}}>Banküberweisungen in Sekundenschnelle</span></div>

<div className="mb-5"><FontAwesomeIcon icon={faMicrophone} className="mr-10" style={{background:"#0F8CE9", color:"#fff", padding:"3px", borderRadius:"5px", width:"20px", height:"20px"}} /><span style={{position:"absolute"}}>Geld versenden über Voice Assistant</span></div>

<div className="mb-5"><FontAwesomeIcon icon={faUtensils} className="mr-10" style={{background:localStorage.getItem("storeColor"), color:"#fff", padding:"0 5px", borderRadius:"5px", width:"20px", height:"20px"}} /><span style={{position:"absolute"}}>Online Essen bestellen</span></div>

<div className="mb-5"><FontAwesomeIcon icon={faShieldAlt} className="mr-10" style={{width:"20px", height:"20px", color:"#0F8CE9"}} /><span style={{position:"absolute"}}>Hohes Maß an Privatspähre und Datenschutz</span></div>


{/* <div className="mt-30" style={{fontSize:"12px", fontWeight:300, fontFamily:"open sans"}}>Installation über Google Chrome, Safari, Edge Browser, Chromium Engines.</div> */}

</div>

    </Fragment>
    
    :
    <BulletList />
);

}
const mapStateToProps = state => ({
    settings: state.settings.settings,
    language: state.languages
});

export default connect(mapStateToProps)(TextComponent)
