import BOOT from '../../bootstrap/boot';
import boot from './bootstrap/boot';

async function app(options: options) {
    await Promise.all([
        BOOT(),
        boot()
    ]);    
    // const [router, listen] = await Promise.all([
    //     import('./router'),
    //     import('./listen'),
    // ]);
    // await Promise.all([
    //     router.default(),
    //     listen.default()
    // ]);
}

export default callback(app);