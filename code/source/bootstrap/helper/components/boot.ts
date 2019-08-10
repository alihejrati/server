import model from './model/boot';
import stack from './stack/boot';
import tools from './tools/boot';
import captcha from './captcha/boot';

async function boot(options: options) {
    await Promise.all([
        model(),
        stack(),
        tools(),
        captcha()
    ]);
}

export default callback(boot);