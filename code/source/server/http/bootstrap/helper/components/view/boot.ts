import send from '../../../../components/view/send';

async function boot(options: options) {
    global.view = {
        send: send
    };
}

export default callback(boot);