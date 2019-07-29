import * as packages from './packages';

async function boot(options: options) {
    global.npm = packages;
    await Promise.all([
        import('./use'),
        import('./mid'),
        import('./engine'),
        import('./set')
    ]);
}

export default callback(boot);