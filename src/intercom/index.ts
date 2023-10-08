import { INTERCOM_API_KEY } from '../app/config/enviroments.ts';
import Intercom from '@mathieustan/intercom';
const startIntercomMessenger = (email: string) => {
  const intercom: Intercom = new Intercom({ appId: INTERCOM_API_KEY });
  intercom.boot({
    email: email,
    app_id: INTERCOM_API_KEY
  });
  intercom.show();
};

export { startIntercomMessenger };
