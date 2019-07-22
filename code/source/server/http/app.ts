import BOOT from '../../bootstrap/boot';
import boot from './bootstrap/boot';

async function app(options: options) {
    await Promise.all([
        BOOT(),
        boot()
    ]);    

    setInterval(async () => {
        const t = await config('\\test1\\test2\\t.conf.json');
        console.log['fatal'](t);
    }, 10000);
    setTimeout(async () => {
        await mongodb.insert('config', {
            key: '\\test1\\test2\\t.conf.json',
            value: {
                name: 'hooo!',
                fullname: 'mmd!'
            }
        });
    }, 25000);
}

export default callback(app);