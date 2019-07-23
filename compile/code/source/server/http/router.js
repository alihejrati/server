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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
function router(options) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, controllers, controllers_1, controllers_1_1, controller, controllerFunction, _b, _c, _d, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4, config('\\code\\source\\server\\http\\listen.conf.json')];
                case 1:
                    controllers = _e.sent();
                    controllers.unshift({
                        name: 'init',
                        path: '/',
                        host: undefined,
                        port: undefined
                    });
                    controllers.push({
                        name: 'service',
                        path: '/',
                        host: undefined,
                        port: undefined
                    });
                    controllers.push({
                        name: 'error',
                        path: '/',
                        host: undefined,
                        port: undefined
                    });
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 8, 9, 10]);
                    controllers_1 = __values(controllers), controllers_1_1 = controllers_1.next();
                    _e.label = 3;
                case 3:
                    if (!!controllers_1_1.done) return [3, 7];
                    controller = controllers_1_1.value;
                    return [4, Import("/code/source/server/http/controllers/" + controller.name + "/controller")];
                case 4:
                    controllerFunction = _e.sent();
                    _c = (_b = npm.app).use;
                    _d = ["" + (controller.path ? controller.path : '/' + controller.name)];
                    return [4, controllerFunction.default()];
                case 5:
                    _c.apply(_b, _d.concat([_e.sent()]));
                    _e.label = 6;
                case 6:
                    controllers_1_1 = controllers_1.next();
                    return [3, 3];
                case 7: return [3, 10];
                case 8:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 10];
                case 9:
                    try {
                        if (controllers_1_1 && !controllers_1_1.done && (_a = controllers_1.return)) _a.call(controllers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 10: return [2];
            }
        });
    });
}
exports.default = callback(router);
