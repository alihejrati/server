import extraction from './use/extraction';
import authentication from './use/authentication';

async function controller(options: options) {
    const controller = npm.express.Router();
    
    controller.use('/', extraction);
    controller.use('/', authentication);

    return controller;
}

export default callback(controller);