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
var currentDir = require("current-dir");
var editJsonFile = require("edit-json-file");
var gulp = require("gulp");
var jsonTree = require("gulp-json-tree");
var node_watch_1 = require("node-watch");
var Model = require(currentDir() + "/file/private/database/mongodb/model.js")['db_config'];
var configuration = editJsonFile('configuration.conf.json');
semaphore.on('/module/logger/ready', function () {
    global.config = config;
    semaphore.emit('/module/config/ready');
});
node_watch_1.default(currentDir() + "/file/private/configuration", { recursive: true }, function (event, name) {
    var stream = gulp.src('file/private/configuration/**/*.conf.json')
        .pipe(jsonTree({ filename: 'configuration.conf.json' }))
        .pipe(gulp.dest('.'));
    stream.on('end', function () {
        configuration = editJsonFile('configuration.conf.json');
        if (/logger\.conf\.json$/g.test(name) && event == 'update') {
            semaphore.emit('/module/config/change[logger.conf.json]', configuration.data['\\code\\kernel\\functions\\logger.conf.json']);
        }
    });
});
function config(key) {
    return __awaiter(this, void 0, void 0, function () {
        var value, document_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = configuration.data[key];
                    if (!!/logger\.conf\.json$/g.test(key)) return [3, 2];
                    return [4, Model.findOne({ key: key }).sort({}).select({})];
                case 1:
                    document_1 = (_a.sent()) || {};
                    value = (JSON.parse(JSON.stringify(document_1)))['value'] || value;
                    _a.label = 2;
                case 2:
                    console.log['kernel/config']({
                        level: value ? 'trace' : 'warn',
                        key: key,
                        value: value
                    });
                    return [2, value];
            }
        });
    });
}
exports.default = config;
