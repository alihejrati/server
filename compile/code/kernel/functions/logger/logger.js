"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _log4js = require("log4js");
var mongoAppender = require("log4js-node-mongodb");
var log4js;
var loggerConfJson = {
    enable: false,
    map: {}
};
semaphore.on('/module/config/ready', function () {
    config('\\code\\kernel\\functions\\logger.conf.json').then(function (conf) {
        var CONNECTION = conf.CONNECTION;
        var CATEGORY = conf.CATEGORY;
        _log4js.addAppender(mongoAppender.appender({ connectionString: CONNECTION }), CATEGORY);
        log4js = _log4js.getLogger(CATEGORY);
        loggerConfJson = conf;
        semaphore.on('/module/config/change[logger.conf.json]', function (conf) {
            loggerConfJson = conf;
        });
    });
});
function purelog(level, sublevel) {
    var parameters = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        parameters[_i - 2] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var obj;
        return __generator(this, function (_a) {
            obj = {
                sublevel: sublevel,
                app: process.argv[2],
                parameters: parameters
            };
            if (log4js) {
                try {
                    log4js[level](obj);
                }
                catch (error) {
                    log4js['trace'](obj);
                }
            }
            return [2];
        });
    });
}
function log(level) {
    var parameters = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        parameters[_i - 1] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var LEVEL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(loggerConfJson && loggerConfJson.enable)) return [3, 2];
                    return [4, sleep(0)];
                case 1:
                    _a.sent();
                    if (/^kernel\/[A-Za-z0-9]+$/g.test(level)) {
                        LEVEL = 'trace';
                        try {
                            LEVEL = parameters[0]['level'];
                        }
                        catch (error) {
                            LEVEL = 'trace';
                        }
                        purelog.apply(void 0, __spread([LEVEL, level], parameters));
                    }
                    else {
                        purelog.apply(void 0, __spread([loggerConfJson.map[level] || level, level], parameters));
                    }
                    _a.label = 2;
                case 2: return [2];
            }
        });
    });
}
function logger() {
    return __awaiter(this, void 0, void 0, function () {
        var handler;
        return __generator(this, function (_a) {
            handler = {
                get: function (obj, level) {
                    return function () {
                        var parameters = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            parameters[_i] = arguments[_i];
                        }
                        return log.apply(void 0, __spread([level], parameters));
                    };
                },
            };
            console.log = new Proxy(function () {
                var parameters = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    parameters[_i] = arguments[_i];
                }
                log.apply(void 0, __spread(['debug'], parameters));
            }, handler);
            semaphore.emit('/module/logger/ready');
            return [2];
        });
    });
}
exports.default = logger;
