import {INTERCOM_API_KEY} from "../app/config/enviroments.ts";
import Intercom from "@mathieustan/intercom";

const intercom = new Intercom({ appId: INTERCOM_API_KEY });
const startIntercomMessenger = () => {
    if (!intercom.ready) {
        intercom.once('ready', () => rebootIntercom());
    } else {
        rebootIntercom();
    }
}

const rebootIntercom = () => {
    intercom.shutdown();

    if (intercom.isBooted) return;
    intercom.boot({
        app_id: INTERCOM_API_KEY
    });
}

export {
    intercom,
    startIntercomMessenger
}