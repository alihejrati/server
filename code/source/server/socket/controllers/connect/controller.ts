import extraction from './use/extraction';

async function controller(controller, options: options) {
    
    controller.use(extraction);
    
    return controller;
}

export default controller;