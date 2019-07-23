import BOOT from '../../bootstrap/boot';
import boot from './bootstrap/boot';

async function app(options: options) {
    await Promise.all([
        BOOT(),
        boot()
    ]);
    const [connection, listen] = await Promise.all([
        import('./connection'),
        import('./listen')
    ]);
    await Promise.all([
        connection.default(),
        listen.default()
    ]);
}

export default callback(app);