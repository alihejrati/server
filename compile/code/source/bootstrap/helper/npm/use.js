"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
npm.app.use(npm.bodyParser.urlencoded({
    extended: false
}));
npm.app.use(npm.bodyParser.json());
npm.app.use(npm.express.static(npm.currentDir() + "/file/public"));
npm.app.use(function (req, res, next) {
    var regex = /^\/.+\/@.+\/.+\.((js)|(css))$/g.test(req.url);
    var path = (npm.currentDir() + "/code/source/server/http/view/" + req.url).replace(/\/+/g, '/');
    regex ? npm.fileExists.sync(path) ? res.sendFile(path) : next() : next();
});
npm.app.use(npm.expressDevice.capture());
npm.app.use(npm.cookieParser());
npm.app.use(npm.expressip().getIpInfoMiddleware);
npm.app.use(npm.expressNoFavicons());
npm.app.use(npm.ipDeviceParser());
npm.app.use(npm.methodOverride());
npm.app.use(function (err, req, res, next) { return next(err); });
npm.app.use(function (err, req, res, next) { return req.xhr ? res.status(500).send({ error: 'Something failed!' }) : next(err); });
npm.app.use(function (err, req, res, next) { return res.status(500).render('error/handler', { error: err }); });
exports.default = undefined;
