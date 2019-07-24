import hell from './use/hell';

async function controller(options: options) {
    const controller = npm.express.Router();
    
    controller.use('/', hell);

    return controller;
}

export default callback(controller);