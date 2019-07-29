async function router(options: options) {
    const controllers = await config('\\code\\source\\server\\http\\listen.conf.json');

    controllers.unshift({
        name: 'init',
        path: '/',
        host: undefined,
        port: undefined
    });
    controllers.push({
        name: 'service',
        path: '/',
        host: undefined,
        port: undefined
    });
    controllers.push({
        name: 'error',
        path: '/',
        host: undefined,
        port: undefined
    });

    for (const controller of controllers) {
        const controllerFunction = await Import(`/code/source/server/http/controllers/${controller.name}/controller.ts`);
        npm.app.use(`${controller.path ? controller.path : '/' + controller.name}`, await controllerFunction.default());
    }
}

export default callback(router);