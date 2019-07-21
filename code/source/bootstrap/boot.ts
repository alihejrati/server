import helper from './helper/boot';

async function boot(options: options) {
    await Promise.all([
        helper()
    ]);
}

export default callback(boot);