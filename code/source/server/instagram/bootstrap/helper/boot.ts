import constant from './constant/boot';
import component from './components/boot';

async function boot(options: options) {
    await Promise.all([
        constant(),
        component()
    ]);
}

export default callback(boot);