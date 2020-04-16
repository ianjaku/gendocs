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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fileHandler_1 = __importDefault(require("./fileHandler"));
var cli_1 = __importDefault(require("./cli"));
var configHandler_1 = __importDefault(require("./configHandler"));
/**
 * Sets up the current directory to contain all necessary items to start writing docs.
 * Creates:
 *  - gendocs.json
 *  - gendocs-token
 *  - .gitignore (appends to it, if it already exists after prompting)
 */
function init(name, token) {
    return __awaiter(this, void 0, void 0, function () {
        var shouldOverwrite, shouldOverwrite;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fileHandler_1.default.fileExists(configHandler_1.default.configFilePath())) return [3 /*break*/, 2];
                    return [4 /*yield*/, cli_1.default.promptOverwrite("gendocs.json")];
                case 1:
                    shouldOverwrite = _a.sent();
                    if (!shouldOverwrite)
                        return [2 /*return*/];
                    _a.label = 2;
                case 2:
                    if (!fileHandler_1.default.fileExists(configHandler_1.default.tokenFilePath())) return [3 /*break*/, 4];
                    return [4 /*yield*/, cli_1.default.promptOverwrite("gendocs-token")];
                case 3:
                    shouldOverwrite = _a.sent();
                    if (!shouldOverwrite)
                        return [2 /*return*/];
                    _a.label = 4;
                case 4: return [4 /*yield*/, configHandler_1.default.createConfigFile(name)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, configHandler_1.default.createTokenFile(token)];
                case 6:
                    _a.sent();
                    if (fileHandler_1.default.fileExists(gitIgnorePath())) {
                        fileHandler_1.default.appendToFile(gitIgnorePath(), "# Gendocs token file\ngendocs-token\n");
                    }
                    else {
                        fileHandler_1.default.createAndWrite(gitIgnorePath(), "gendocs-token\n");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function gitIgnorePath() {
    return path_1.default.join(basePath(), ".gitignore");
}
function basePath() {
    return process.cwd();
}
exports.default = {
    init: init
};
