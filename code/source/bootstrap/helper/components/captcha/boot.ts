import create from '../../../../components/captcha/create';

async function boot(options: options) {
    global.captcha = {
        create: create
    };
}

export default callback(boot);