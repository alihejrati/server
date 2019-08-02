async function send(VIEW: string, PAGE: string, req, res, options: options) {
    PAGE = PAGE.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\//g, '').replace(/\/+$/g, '');
    const status = req['_'].carry.config.statusCode;
    let path: string;
    let variables = {
        _layoutFile: '',
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
            } else {
                req['_'].status = status.failedDependency;
                return 'next';
            }
        } else {
            req['_'].status = status.unauthorized;
            return 'next';
        }
    } else {
        path = `/${VIEW}/pages/${PAGE}/index.ejs`;
    }
    path = path.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/\/+$/g, '').toLowerCase();;
    
    if (npm.fileExists.sync(`${npm.currentDir()}/code/source/server/http/views/${path}`)) {
        const _layoutFile = path.replace(new RegExp(`/${PAGE}/index\.ejs$`, 'g'), '/layout-' + PAGE.replace(/^\//g, '').split('/')[0]).replace(/^\//g, '');
        npm.fileExists.sync(`${npm.currentDir()}/code/source/server/http/views/${_layoutFile}.ejs`) ? variables._layoutFile = _layoutFile : null;
        variables['captcha'] = await captcha.create(req['_'].unique);
        res.render(path.replace(/\.ejs$/g, '').replace(/^\//g, ''), variables);
    } else {
        req['_'].status = status.noContent;
        return 'next';
    }
}

export default callback(send);