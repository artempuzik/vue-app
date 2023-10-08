import { INTERCOM_API_KEY } from '../app/config/enviroments.ts';
import Intercom from '@mathieustan/intercom';

interface IntercomWithOnce extends Intercom {
  // eslint-disable-next-line no-unused-vars
  once: (state: string, func: () => void) => void
}

const startIntercomMessenger = (email: string) => {
  const intercom: Intercom = new Intercom({ appId: INTERCOM_API_KEY });
  intercom.boot({
    email: email,
    app_id: INTERCOM_API_KEY
  });
  intercom.show();
  if (!intercom.ready) {
    (intercom as IntercomWithOnce).once('ready', () => rebootIntercom(intercom, email));
  } else {
    rebootIntercom(intercom, email);
  }
};

function rebootIntercom (intercom: Intercom, email: string) {
  intercom.shutdown();

  if (intercom.isBooted) return;
  intercom.boot({
    email: email,
    app_id: INTERCOM_API_KEY
  });
}

export { startIntercomMessenger };