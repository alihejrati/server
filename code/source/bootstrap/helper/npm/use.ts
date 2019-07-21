npm.app.use(npm.bodyParser.urlencoded({
    extended: false
}));
npm.app.use(npm.bodyParser.json());
npm.app.use(npm.express.static(`${npm.currentDir()}/file/static/public`));
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

export default undefined;