async function index(req, res, next) {
    const status = req['_'].carry.config.statusCode;
    await view.send('?', '/index', req, res, {
        next: next, variables: {
            title: `داشبورد`,
        }
    });
}

export default index;