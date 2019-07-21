import constant from './constant/boot';
import npm from './npm/boot';
import component from './components/boot';

async function boot(options: options) {
    await Promise.all([
        constant(),
        npm(),
        component()
    ]);
}

export default callback(boot);