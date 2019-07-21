import model from './model/boot';
import stack from './stack/boot';
import captcha from './captcha/boot';

async function boot(options: options) {
    await Promise.all([
        model(),
        stack(),
        captcha()
    ]);
}

export default callback(boot);