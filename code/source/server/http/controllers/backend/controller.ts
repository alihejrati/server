import table from './get/table';

async function controller(options?: options) {
    const controller = npm.express.Router();
    
    controller.get('/', (req, res, next) => {
        req['_'].temporary.watchdog.layer = '/backend/**';
        next();
    });
    controller.get('/table/:table', table);

    return controller;
}

export default controller;