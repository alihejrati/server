import browser from './get/browser';

async function controller(options?: options) {
    const controller = npm.express.Router();
    
    controller.get('/', (req, res, next) => {
        req['_'].temporary.watchdog.layer = '/browser/**';
        next();
    });
    controller.get('/', browser);

    return controller;
}

export default controller;