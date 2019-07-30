import extraction from './use/extraction';
import hell from './use/hell';

async function controller(controller, options: options) {
    
    controller.use(extraction);
    controller.use(hell);
    
    return controller;
}

export default controller;