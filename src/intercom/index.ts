import { INTERCOM_API_KEY } from '../app/config/enviroments.ts';
import Intercom from '@mathieustan/intercom';

interface IntercomWithOnce extends Intercom {
  // eslint-disable-next-line no-unused-vars
  once: (state: string, func: () => void) => void
}

const startIntercomMessenger = (name = '') => {
  const intercom: Intercom = new Intercom({ appId: INTERCOM_API_KEY });
  const settings = name ? {name} : {}
  intercom.boot({
    ...settings,
    app_id: INTERCOM_API_KEY
  });
  intercom.show();
  if (!intercom.ready) {
    (intercom as IntercomWithOnce).once('ready', () => rebootIntercom(intercom, settings));
  } else {
    rebootIntercom(intercom, settings);
  }
};

function rebootIntercom (intercom: Intercom, settings: {}) {
  intercom.shutdown();

  if (intercom.isBooted) return;
  intercom.boot({
    ...settings,
    app_id: INTERCOM_API_KEY
  });
}

export { startIntercomMessenger };