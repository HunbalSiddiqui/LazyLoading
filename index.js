import React, { Component, lazy, Suspense } from "react";
import Ink from "react-ink";
import QRCode from 'qrcode.react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//browser check
import PWAPrompt from 'react-ios-pwa-prompt'
import { isChrome, isChromium, isMobileSafari, isMobile, fullBrowserVersion, osName } from 'react-device-detect';

//bootstrap
import ReactDOM from 'react-dom';
import { Modal, Button, Dropdown, Accordion, Card } from 'react-bootstrap';

// fontawesome
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
// import TextComponent from "./TextComponent";
import ContentLoader, { Facebook, BulletList } from "react-content-loader";

const TextComponent = lazy(()=>import("./TextComponent"))

declare var INSTALL_APP_POPUP;

class Hero extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            berechtigungenModal: false,
        };
    }

    static contextTypes = {
        router: () => null
    };

    componentDidMount() {
        window.getOriginalText();
    }

    __useApp = () => {
        if (this.refs.phoneView) {
            this.refs.phoneView.classList.remove("blured");
        }
        if (this.refs.phone) {
            this.refs.phone.classList.add("phone-use");
        }
    };

    //install app
    showModalApps () {
        this.setState({
           appsModal: true
        });
    }
    hideModalApps = () => {
        this.setState({
            appsModal: false
        });
    }
    showModalInstall () {
        this.setState({
           installModal: true
        });
    }
    hideModalInstall = () => {
        this.setState({
            installModal: false
        });
    }
    showModalBerechtigungen () {
        this.setState({
            berechtigungenModal: true
        });
    }
    hideModalBerechtigungen = () => {
        this.setState({
            berechtigungenModal: false
        });
    }

    //android
    triggerInstallBtn = () => {
        var div = document.getElementById('download');
        div.innerHTML = 'Laden...';
        
        setTimeout(function () {

            if (INSTALL_APP_POPUP) {//INSTALL_APP_POPUP is declared globally
                console.log("INSTALL_APP_POPUP", INSTALL_APP_POPUP); 
                INSTALL_APP_POPUP.prompt(); //this will show the prompt from chrome
            } 

            div.innerHTML = 'Hinzufügen';
        }, 1500);
    }
    // ios
    tooglePwaPrompt () {
        var x = document.getElementById("showPwaprompt");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    next = (install, pwaSupported) =>{
        if(pwaSupported == false){
            alert("Deine Browser Version wird nicht unterstützt. Bitte installiere Chrome 70 oder höher.");
        } else if(install == "voice"){
            this.hideModalBerechtigungen2();
            this.showModalInstall2();
        } else {
            this.hideModalBerechtigungen();
            this.showModalInstall();
        }
    }
    fullBrowserVersion = () =>{
        return fullBrowserVersion.replace( /^([^.]*\.)(.*)$/, function ( a, b, c ) { 
            return b + c.replace( /\./g, '' );
        });
    }


        
    MyFacebookLoader = () => <Facebook />;

    render() {

        //check if chrome version is supported
        if(isChrome || isChromium){
            if(osName == "Windows" && this.fullBrowserVersion() >= 70){
                var pwaSupported = true;
            } else if(osName == "Android" && this.fullBrowserVersion() >= 31){
                var pwaSupported = true;
            } else if(osName == "Ubuntu" && this.fullBrowserVersion() >= 72){
                var pwaSupported = true;
            } else {
                var pwaSupported = false;
            }
        } else {
            var pwaSupported = false;
        }

        if(matchMedia('(display-mode: standalone)').matches == true) {
            var install = <span onClick={this.getMyLocation} style={{borderRadius:"0.2rem", cursor:"pointer", position:"relative", boxShadow:"rgb(255, 106, 0) 0px 1px 2px 0px", background:"linear-gradient(90deg, rgb(253, 141, 66), rgb(255, 106, 0))", color:"#fff", padding:"12px 20px 10px", fontWeight:600}}>{localStorage.getItem("firstScreenSetupLocation")}<Ink duration="500" /></span>
        } else if(isMobileSafari){
            var install = <span onClick={() => { this.tooglePwaPrompt(); }} style={{borderRadius:"0.2rem", cursor:"pointer", position:"relative", boxShadow:"rgb(255, 106, 0) 0px 1px 2px 0px", background:"linear-gradient(90deg, rgb(253, 141, 66), rgb(255, 106, 0))", color:"#fff", padding:"12px 20px 10px", fontWeight:600}}>{localStorage.getItem("firstScreenInstall")}<Ink duration="500" /></span>
        } else {
            var install = <span onClick={() => { this.showModalBerechtigungen(); }} style={{borderRadius:"0.2rem", cursor:"pointer", position:"relative", boxShadow:"rgb(255, 106, 0) 0px 1px 2px 0px", background:"linear-gradient(90deg, rgb(253, 141, 66), rgb(255, 106, 0))", color:"#fff", padding:"12px 20px 10px", fontWeight:600}}>{localStorage.getItem("firstScreenInstall")}<Ink duration="500" /></span>
        }

        return (
            <React.Fragment>
                <div className="container-fluid p-0 main-container-desktop">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-12 left-col">
                                    {/* <img src="/assets/img/logos/logo.png" alt={localStorage.getItem("storeName")} className="desktop-logo" /> */}
                                    <div className="mb-50"><span style={{fontWeight:"bold", fontSize:"30px"}}>Paydizer</span>.com</div>


                                    {/* <h1 className="desktop-title">Scan & Pay</h1>
                                    <h3 className="desktop-subtitle">Machen Sie Zahlungen in Tausenden von Geschäften mit einem einzigen Klick</h3> */}

                                    {/* <h1 className="desktop-title">Geld Transfer</h1>
                                    <h3 className="desktop-subtitle">Senden und Empfangen von Geld in Sekundenschnelle</h3> */}

                                    {/* <h1 className="desktop-title">Der Alleskönner</h1> */}
                                    {/* <h3 className="desktop-subtitle">Die Super-App, die alles miteinander verbindet</h3> */}
                                    <Suspense fallback={<BulletList />}>
                                        <TextComponent/>
                                    </Suspense>
                                    {/* Buttons */}
                                    <div className="mt-50">

                                        {/* download app */}
                                        <span className="shopper mr-2" style={{background:"#1576FF", float:"left"}} onClick={() => this.showModalApps()}>
                                            <FontAwesomeIcon icon={faMobileAlt} style={{float:"left", fontSize:"30px", marginRight:"8px"}} />
                                            <div style={{float:"left", lineHeight:1.1}}>
                                                <span style={{fontWeight: 600, display: "inline-block"}}>Download<Ink duration="500" /></span>
                                                <div style={{fontSize:"12px", fontFamily:"open sans", fontWeight:"400"}}>App installieren</div>
                                            </div>
                                        </span>

                                        {/* demo app */}
                                        <span className="shopper" style={{background:"#1576FF", float:"left"}} onClick={this.__useApp}>
                                            <FontAwesomeIcon icon={faMobileAlt} style={{float:"left", fontSize:"30px", marginRight:"8px"}} />
                                            <div style={{float:"left", lineHeight:1.1}}>
                                                <span style={{fontWeight: 600, display: "inline-block"}}>Live Vorschau<Ink duration="500" /></span>
                                                <div style={{fontSize:"12px", fontFamily:"open sans", fontWeight:"400"}}>Im Browser testen</div>
                                            </div>
                                        </span>

                                    </div>

                                    {/* downlaod app */}
                                    <Modal show={this.state.appsModal} onHide={this.hideModalApps} size="lg">
                                        <Modal.Body style={{padding:"50px"}}>
                                            
                                            <div style={{float:"left", width:"40%"}} className="mb-20"><QRCode value={"https://paydizer.com/home/download"} style={{width:"100%", height:"auto"}} /></div>
                        
                                            <div style={{float:"right", width:"50%", lineHeight:"2", color:"#0088cc", fontSize:"22px"}}>

                                                <a className="mb-20" href="https://paydizer.com/d/paydizer.apk" style={{cursor:"pointer", border:"1px solid #0088cc", borderRadius:"5px", padding:"5px 10px", display:"block", overflow:"auto"}}>
                                                    <FontAwesomeIcon icon={faAndroid} style={{fontSize:"40px", width:"40px", flaot:"left"}} />
                                                    <div style={{float:"right", width:"calc(100% - 60px)"}}>
                                                        <div>Android (APK)</div>
                                                        <div style={{fontSize:"12px", lineHeight:"normal"}}>Chrome v72 oder höher<br/>Apps aus externen Quellen zulassen</div>
                                                    </div>
                                                </a>

                                                <a className="mb-20" onClick={() => this.next("", pwaSupported)} style={{cursor:"pointer", border:"1px solid #0088cc", borderRadius:"5px", padding:"5px 10px", display:"block", overflow:"auto"}}>
                                                    <FontAwesomeIcon icon={faAndroid} style={{fontSize:"40px", width:"40px", flaot:"left"}} />
                                                    <div style={{float:"right", width:"calc(100% - 60px)"}}>
                                                        <div>Android (PWA)</div>
                                                        <div style={{fontSize:"12px", lineHeight:"normal"}}>Chrome v70 oder höher<br/>Google Play Konto erforderlich</div>
                                                    </div>
                                                </a>

                                                <a className="mb-20" onClick={() => this.tooglePwaPrompt()} style={{cursor:"pointer", border:"1px solid #0088cc", borderRadius:"5px", padding:"5px 10px", display:"block", overflow:"auto"}}>
                                                    <FontAwesomeIcon icon={faApple} style={{fontSize:"40px", width:"40px", flaot:"left"}} />
                                                    <div style={{float:"right", width:"calc(100% - 60px)"}}>
                                                        <div>iPhone (Safari)</div>
                                                        <div style={{fontSize:"12px", lineHeight:"normal"}}>iOS 11.3 oder höher</div>
                                                    </div>
                                                </a>

                                            </div>

                                        </Modal.Body>
                                    </Modal>

                                    {/* pwa */}
                                    <Modal show={this.state.installModal} onHide={this.hideModalInstall}>
                                        
                                        <Modal.Header closeButton>
                                            <Modal.Title>Installieren</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body style={{padding:"0 25px 10px"}}>
                                            <div style={{marginTop:"12px"}}>
                                                Klicke auf hinzufügen um Paydizer auf deinen Bildschirm zu installieren.
                                            </div>
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.hideModalInstall}> 
                                                Schließen
                                            </Button> 
                                            <Button variant="primary" onClick={() => this.triggerInstallBtn()} id="download">
                                                Hinzufügen
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </div>
                            </div>
                            <div className="col-md-6 mt-50">
                                <div className="col-md-12 blured" ref="phoneView">
                                    <div className="phone" ref="phone">
                                        {/* <div className="notch" /> */}
                                        <div className="iframe-wrapper">
                                            <iframe title="appIframe" src={window.location} frameBorder="0" id="appIframe" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="showPwaprompt" style={{display:"none"}}>
                    {/* <PWAPrompt debug={1} 
                        copyTitle={"Add to Home Screen"} 
                        copyBody={"This website has app functionality. Add it to your home screen to use it in fullscreen and while offline."}
                        copyShareButtonLabel={"1) Press the 'Share' button"}
                        copyAddHomeButtonLabel={"2) Press 'Add to Home Screen'"}
                        copyClosePrompt={"Cancel"} 
                    /> */}
                    <PWAPrompt debug={1} 
                        copyTitle={"Installieren"} 
                        copyBody={"Diese App zum Startbildschirm hinzufügen"}
                        copyShareButtonLabel={"1) Klicken Sie auf 'Teilen'"}
                        copyAddHomeButtonLabel={"2) Zum Home-Bildschirm"}
                        copyClosePrompt={"Schließen"} 
                    />
                </div>

            </React.Fragment>
        );
    }
}

export default Hero;
