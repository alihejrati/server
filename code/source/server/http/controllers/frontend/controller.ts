import begin from './get/begin';

async function controller(options?: options) {
    const controller = npm.express.Router();
    
    controller.get('/', (req, res, next) => {
        req['_'].temporary.watchdog.layer = '/frontend/**';
        next();
    });
    controller.get('/', begin);

    return controller;
}

export default controller;