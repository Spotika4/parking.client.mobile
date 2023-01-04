import React from "react";
import ReactDOM from "react-dom";
import "cordova_script";

import { App } from "./components/App";


function run(config){
	ReactDOM.render(
		<App {...config} />,
		document.getElementById("ROOT")
	);
}

function onDeviceReady(e) {
    if(navigator?.splashscreen){
        navigator.splashscreen.show();
    }

    const config = {
        push: false,
        className: `${window.device.platform.toLowerCase()} ${window.device.model.toLowerCase()}`
    };

    run(config);
}

document.addEventListener("deviceready", onDeviceReady, false);