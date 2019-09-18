import index from './get/index';
import table from './get/table';
import signin from './get/signin';
import signup from './get/signup';

async function controller(options?: options) {
    const controller = npm.express.Router();
    
    controller.get('/', (req, res, next) => {
        req['_'].temporary.watchdog.layer = '/backend/**';
        next();
    });
    controller.get('/', index);
    controller.get('/table/:table', table);
    controller.get('/signin', signin);
    controller.get('/signup', signup);

    return controller;
}

export default controller;