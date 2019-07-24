import attach from '../../../../components/response/attach';
import send from '../../../../components/response/send';

async function boot(options: options) {
    global.response = {
        attach: attach,
        send: send,
    };
}

export default callback(boot);