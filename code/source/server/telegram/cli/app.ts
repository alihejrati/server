import BOOT from '../../../bootstrap/boot';
import boot from './bootstrap/boot';

async function app(options: options) {
    await Promise.all([
        BOOT(),
        boot()
    ]);
}

export default callback(app);