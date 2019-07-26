async function controller(options: options) {
    const controller = npm.express.Router();
    
    controller.use('/', (req, res, next) => {
        req['_'].temporary.watchdog.layer = '/frontend/**';
        next();
    });

    return controller;
}

export default callback(controller);