import extraction from './use/extraction';
import authentication from './use/authentication';

async function controller(controller, options: options) {
    
    controller.use(extraction);
    controller.use(authentication);
    
    return controller;
}

export default controller;