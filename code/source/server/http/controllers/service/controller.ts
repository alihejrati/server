async function controller(options: options) {
    const controller = npm.express.Router();
    
    controller.use('/', (req, res, next) => {
        next();
    });

    return controller;
}

export default callback(controller);