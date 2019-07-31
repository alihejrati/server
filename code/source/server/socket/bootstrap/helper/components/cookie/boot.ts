import cookieSet from '../../../../components/cookie/set';
import cookieGet from '../../../../components/cookie/get';

async function boot(options: options) {
    global.cookie = {
        set: cookieSet,
        get: cookieGet,
    };
}

export default callback(boot);