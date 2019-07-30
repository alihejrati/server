import test from './use/test';

async function controller(controller, options: options) {

    controller.use(test);

    return controller;
}

export default controller;