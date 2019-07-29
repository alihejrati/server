import create from '../../../../components/captcha/create';
import check from '../../../../components/captcha/check';

async function boot(options: options) {
    global.captcha = {
        create: create,
        check: check
    };
}

export default callback(boot);