import hell from './use/hell';

async function controller(options?: options) {
    const controller = npm.express.Router();
    
    controller.use('/', (req, res, next) => {
        req['_'].temporary.watchdog.layer = '/error/**';
        next();
    });
    controller.use('/', hell);

    return controller;
}

export default controller;