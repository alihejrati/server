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
Object.defineProperty(exports, "__esModule", { value: true });
var viewHell = { VIEW: '', PAGE: '' };
config('\\code\\source\\server\\http\\view\\hell.conf.json').then(function (conf) { return viewHell = conf; });
function statusCode(code, req, res) {
    var status = req['_'].carry.config.statusCode;
    req['_'].status = req['_'].status == status.successful ? code : req['_'].status;
}
function hell(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var code, status, VIEW, PAGE, SEND, NEXT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    status = req['_'].carry.config.statusCode;
                    VIEW = req['_'].user.login ? '?' : viewHell.VIEW;
                    PAGE = req['_'].user.login ? 'error/code' : viewHell.PAGE;
                    SEND = function () {
                        res.render('error/handler');
                    };
                    NEXT = function () {
                        req['_'].status = code;
                        if (VIEW == '?') {
                            view.send(viewHell.VIEW, viewHell.PAGE, req, res, { next: SEND, variables: {} });
                        }
                        else {
                            SEND();
                        }
                    };
                    if (!(req['_'].service.discovery.length == 0)) return [3, 6];
                    statusCode(status.notFound, req, res);
                    if (!(req['_'].route.method == 'get')) return [3, 2];
                    code = req['_'].status;
                    return [4, view.send(VIEW, PAGE, req, res, { next: NEXT, variables: {} })];
                case 1:
                    _a.sent();
                    return [3, 5];
                case 2: return [4, response.attach(null, req, res)];
                case 3:
                    _a.sent();
                    return [4, response.send(req, res)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3, 11];
                case 6:
                    statusCode(status.multiStatus, req, res);
                    if (!(req['_'].route.method == 'get')) return [3, 8];
                    code = req['_'].status;
                    return [4, view.send(VIEW, PAGE, req, res, { next: NEXT, variables: {} })];
                case 7:
                    _a.sent();
                    return [3, 11];
                case 8: return [4, response.attach(null, req, res)];
                case 9:
                    _a.sent();
                    return [4, response.send(req, res)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [2];
            }
        });
    });
}
exports.default = hell;
