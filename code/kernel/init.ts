import functions from './functions/init';
import { EventEmitter } from 'events';

async function init() {
    global.semaphore = new EventEmitter();

    await Promise.all([
        functions()
    ]);
    const app = await (await import(`../source/${process.argv[2]}/app`)).default;
    app();
}

init();