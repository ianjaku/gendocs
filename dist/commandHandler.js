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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var commandMessages_1 = __importDefault(require("./commandMessages"));
var logger_1 = __importDefault(require("./logger"));
var cli_1 = __importDefault(require("./cli"));
var repository_1 = __importDefault(require("./repository"));
var _handlers = {
    help: function (args) {
        if (args.length > 0) {
            var target = args[0];
            if (target in commandMessages_1.default) {
                logger_1.default.info(commandMessages_1.default[target]());
                return;
            }
        }
        logger_1.default.info(commandMessages_1.default.help());
    },
    "register": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, cli_1.default.promptCredentials()];
                case 1:
                    _a = _b.sent(), email = _a.email, password = _a.password;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, repository_1.default.createUser(email, password)];
                case 3:
                    _b.sent();
                    logger_1.default.info("Registration was succesful!");
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    handleRepositoryError(e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    "document:create": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, name, response, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, cli_1.default.promptCredentials()];
                case 1:
                    _a = _b.sent(), email = _a.email, password = _a.password;
                    return [4 /*yield*/, cli_1.default.promptCreateDocument()];
                case 2:
                    name = (_b.sent()).name;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, repository_1.default.createDocument(name, email, password)];
                case 4:
                    response = _b.sent();
                    logger_1.default.info("Document created successfully! Your token: " + response.doc.token);
                    return [3 /*break*/, 6];
                case 5:
                    e_2 = _b.sent();
                    handleRepositoryError(e_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    "document:list": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, response, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, cli_1.default.promptCredentials()];
                case 1:
                    _a = _b.sent(), email = _a.email, password = _a.password;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, repository_1.default.listDocuments(email, password)];
                case 3:
                    response = _b.sent();
                    logger_1.default.info("[Your documents]");
                    response.docs.forEach(function (doc) {
                        logger_1.default.info("- " + doc.name + " : " + doc.token);
                    });
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _b.sent();
                    handleRepositoryError(e_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }
};
function handleRepositoryError(e) {
    if (e.response != null && e.response.data != null && e.response.data.errors != null) {
        var errors = e.response.data.errors;
        for (var key in errors) {
            for (var _i = 0, _a = errors[key]; _i < _a.length; _i++) {
                var message = _a[_i];
                logger_1.default.error(key + " " + message);
            }
        }
    }
    else {
        logger_1.default.error(e.message);
    }
}
function run() {
    if (process.argv.length < 3) {
        logger_1.default.info(commandMessages_1.default.help());
        return;
    }
    var command = process.argv[2];
    if (!(command in _handlers)) {
        logger_1.default.info(commandMessages_1.default.help());
        return;
    }
    var args = [];
    if (process.argv.length > 3) {
        args = process.argv.slice(3);
    }
    _handlers[command](args);
}
exports.default = {
    run: run
};
