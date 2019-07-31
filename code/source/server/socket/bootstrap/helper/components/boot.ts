import cookie from './cookie/boot';

async function boot(options: options) {
    await Promise.all([
        cookie()
    ]);
}

export default callback(boot);