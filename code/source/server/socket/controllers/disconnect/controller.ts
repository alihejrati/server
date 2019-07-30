import hell from './use/hell';

async function controller(controller, options: options) {
    
    controller.use(hell);
    
    return controller;
}

export default controller;