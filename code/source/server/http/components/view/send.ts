async function send(VIEW: string, PAGE: string, req, res, options: options) {
    const next = options['next'];
    PAGE = PAGE.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\//g, '').replace(/\/+$/g, '');
    const status = req['_'].carry.config.statusCode;
    let path: string;
    let variables = {
        _layoutFile: '',
        template: `/template/${VIEW}`.replace(/\/+/g, '/'),
        status: {code: req['_'].status, msg: (str => str.replace(/([a-z]+)([A-Z][a-z]+)/, "$1 $2"))(Object.keys(status)[Object.values(status).indexOf(req['_'].status)])},
        _: req['_'],
        variables: options['variables'] || {}
    };

    if (VIEW == '?') {
        if (req['_'].user.login) {
            const viewport = await mongodb.findOne('view', {
                _id: req['_'].user.who.view
            });
            if (viewport) {
                path = `/${viewport.branch['@' + req['_'].controller]}/pages/${PAGE}/index.ejs`;
                variables.template = `/template/${viewport.branch['@' + req['_'].controller]}`.replace(/\/+/g, '/');
            } else {
                req['_'].status = status.failedDependency;
                next();
                return 'next';
            }
        } else {
            req['_'].status = status.unauthorized;
            next();
            return 'next';
        }
    } else {
        path = `/${VIEW}/pages/${PAGE}/index.ejs`;
    }
    path = path.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/\/+$/g, '').toLowerCase();

    if (npm.fileExists.sync(`${npm.currentDir()}/code/source/server/http/views/${path}`)) {
        const _layoutFile = path.replace(new RegExp(`/${PAGE}/index\.ejs$`, 'g'), '/layout-' + PAGE.replace(/^\//g, '').split('/')[0]).replace(/^\//g, '');
        npm.fileExists.sync(`${npm.currentDir()}/code/source/server/http/views/${_layoutFile}.ejs`) ? variables._layoutFile = _layoutFile : null;
        variables['captcha'] = await captcha.create(req['_'].unique);
        
        const _ = Object.assign({}, req['_']);
        delete _['carry'];
        mongodb.insert('request', { response: {type: 'view', data: {path: path, _layoutFile: variables._layoutFile ? `/${variables._layoutFile}.ejs` : '', variables: options['variables'] || {}}}, _: _}); /* async */

        res.render(path.replace(/\.ejs$/g, '').replace(/^\//g, ''), variables);
    } else {
        req['_'].status = status.noContent;
        next();
        return 'next';
    }
}

export default callback(send);