import discovery from './use/discovery';
import serve from './use/serve';

async function controller(controller, options: options) {

    controller.use(discovery);
    controller.use(serve);

    return controller;
}

export default controller;