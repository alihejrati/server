import cookie from './cookie/boot';
import response from './response/boot';

async function boot(options: options) {
    await Promise.all([
        cookie(),
        response()
    ]);
}

export default callback(boot);