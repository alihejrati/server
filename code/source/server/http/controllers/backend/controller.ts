async function controller(options: options) {
    const controller = npm.express.Router();
    
    controller.use('/', (req, res, next) => {
        console.log['fatal']('backend');
        next();
    });

    return controller;
}

export default callback(controller);