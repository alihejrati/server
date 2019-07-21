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
var jsonStringifySafe = require("json-stringify-safe");
function preCall($preCall, specification) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, $$preCall, funcs, funcs_1, funcs_1_1, func, _b, _c, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    $$preCall = {};
                    console.log['kernel/Function/preCall']({
                        level: 'trace'
                    });
                    return [4, $preCall];
                case 1:
                    funcs = _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    funcs_1 = __values(funcs), funcs_1_1 = funcs_1.next();
                    _d.label = 3;
                case 3:
                    if (!!funcs_1_1.done) return [3, 6];
                    func = funcs_1_1.value;
                    _b = $$preCall;
                    _c = func.default.name;
                    return [4, func.default(specification)];
                case 4:
                    _b[_c] = _d.sent();
                    _d.label = 5;
                case 5:
                    funcs_1_1 = funcs_1.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (funcs_1_1 && !funcs_1_1.done && (_a = funcs_1.return)) _a.call(funcs_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 9: return [2, $$preCall];
            }
        });
    });
}
function postReturn($postReturn, specification) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2, _a, $$postReturn, funcs, funcs_2, funcs_2_1, func, _b, _c, e_2_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    $$postReturn = {};
                    console.log['kernel/Function/postReturn']({
                        level: 'trace'
                    });
                    return [4, $postReturn];
                case 1:
                    funcs = _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    funcs_2 = __values(funcs), funcs_2_1 = funcs_2.next();
                    _d.label = 3;
                case 3:
                    if (!!funcs_2_1.done) return [3, 6];
                    func = funcs_2_1.value;
                    _b = $$postReturn;
                    _c = func.default.name;
                    return [4, func.default(specification)];
                case 4:
                    _b[_c] = _d.sent();
                    _d.label = 5;
                case 5:
                    funcs_2_1 = funcs_2.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (funcs_2_1 && !funcs_2_1.done && (_a = funcs_2.return)) _a.call(funcs_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 9: return [2, $$postReturn];
            }
        });
    });
}
function callback(callback, $preCall, $postReturn) {
    if ($preCall === void 0) { $preCall = []; }
    if ($postReturn === void 0) { $postReturn = []; }
    var error = new Error();
    var specification = {
        function: {
            name: callback.name,
            arguments: (function getArgs(func) {
                var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
                return args.split(',').map(function (arg) {
                    return arg.replace(/\/\*.*\*\//, '').trim();
                }).filter(function (arg) {
                    return arg;
                });
            })(callback),
            parameters: []
        }
    };
    function cb() {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var spec, $$preCall, $callback, $$postReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        specification.function.parameters = parameters;
                        spec = JSON.parse(jsonStringifySafe(specification));
                        if (specification.function.arguments[specification.function.arguments.length - 1] == 'options' && specification.function.arguments.length == parameters.length) {
                            parameters[parameters.length - 1]['preCall'] = {};
                            parameters[parameters.length - 1]['specification'] = spec;
                        }
                        else if (specification.function.arguments[specification.function.arguments.length - 1] == 'options' && specification.function.arguments.length == parameters.length + 1) {
                            parameters.push({
                                preCall: {},
                                specification: spec
                            });
                        }
                        else {
                            console.log['kernel/callback']({
                                level: 'error',
                                specification: spec
                            });
                            return [2];
                        }
                        return [4, preCall($preCall, specification)];
                    case 1:
                        $$preCall = _a.sent();
                        parameters[parameters.length - 1]['preCall'] = $$preCall;
                        return [4, callback.apply(void 0, __spread(parameters))];
                    case 2:
                        $callback = _a.sent();
                        return [4, postReturn($postReturn, specification)];
                    case 3:
                        $$postReturn = _a.sent();
                        return [2, $callback];
                }
            });
        });
    }
    Object.defineProperty(cb, 'name', { value: callback.name, writable: false });
    return cb;
}
global.callback = callback;
exports.default = callback;
