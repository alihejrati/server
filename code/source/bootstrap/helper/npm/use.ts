npm.app.use(npm.bodyParser.urlencoded({
    extended: false
}));
npm.app.use(npm.bodyParser.json());
npm.app.use(npm.express.static(`${npm.currentDir()}/file/public`));
npm.app.use((req, res, next) => {
    const regex = /^\/.+\/@.+\/.+\.((js)|(css))$/g.test(req.url);
    const path = `${npm.currentDir()}/code/source/server/http/view/${req.url}`.replace(/\/+/g, '/');
    regex ? npm.fileExists.sync(path) ? res.sendFile(path) : next() : next();
});
npm.app.use(npm.expressDevice.capture());
npm.app.use(npm.cookieParser());
npm.app.use(npm.expressip().getIpInfoMiddleware);
// npm.app.use(npm.serveFavicon('favicon.ico'));
npm.app.use(npm.expressNoFavicons());
npm.app.use(npm.ipDeviceParser());
npm.app.use(npm.methodOverride());
npm.app.use((err, req, res, next) => next(err));
npm.app.use((err, req, res, next) => req.xhr ? res.status(500).send({ error: 'Something failed!' }) : next(err));
npm.app.use((err, req, res, next) => res.status(500).render('error/handler', { error: err }));
npm.app.use(npm.fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

export default undefined;