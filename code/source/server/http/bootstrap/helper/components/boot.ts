import cookie from './cookie/boot';
import response from './response/boot';
import view from './view/boot';

async function boot(options: options) {
    await Promise.all([
        cookie(),
        response(),
        view()
    ]);
}

export default callback(boot);