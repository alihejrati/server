async function discovery(req, res, next, options: options) {
    if (/^.*\/service\//g.test(req['_'].route.path.relative)) {
        const services: string[] = req['_'].route.path.relative.replace(/^.*\/service\//g, '').split(':');
        const discovery: string[] = [];
    
        for (let index = 0; index < services.length; index++) {
            services[index] = services[index].replace(/[\:]+/g, ':').replace(/[\.]+/g, '/').replace(/[\/]*$/g, '').replace(/[\/]+/g, '/').trim();
            services[index] = services[index][0] != '/' ? `/${services[index]}` : services[index];
            services[index] == '' || services[index] == '/' ? null : discovery.push(services[index]);
        }
    
        req['_'].service.discovery = discovery;
    }

    next();
}

export default callback(discovery);