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
var configHandler_1 = __importDefault(require("./configHandler"));
var documentHandler_1 = __importDefault(require("./documentHandler"));
var repository_2 = __importDefault(require("./repository"));
var path_1 = __importDefault(require("path"));
var authHandler_1 = __importDefault(require("./authHandler"));
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
        var invitation, e_1, _a, email, password, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger_1.default.info("\n      Registration is currently only possible after an invitation.\n      If you would to use Gendocs please send an email to ian@invacto.com\n    ");
                    return [4 /*yield*/, cli_1.default.promptInvitation()];
                case 1:
                    invitation = (_b.sent()).invitation;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, repository_1.default.validateInvitation(invitation)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    if (e_1.response.status === 401) {
                        logger_1.default.info("\n          The given invitation is invalid or has already been used.\n        ");
                    }
                    else {
                        handleRepositoryError(e_1);
                    }
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, cli_1.default.promptCredentials()];
                case 6:
                    _a = _b.sent(), email = _a.email, password = _a.password;
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, repository_1.default.createUser(invitation, email, password)];
                case 8:
                    _b.sent();
                    logger_1.default.info("Registration was succesful!");
                    return [3 /*break*/, 10];
                case 9:
                    e_2 = _b.sent();
                    if (e_2.response.status === 401) {
                        logger_1.default.info("\n          The given invitation is invalid or has already been used.\n        ");
                        return [2 /*return*/];
                    }
                    handleRepositoryError(e_2);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); },
    "docs:create": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, name, response, e_3;
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
                    e_3 = _b.sent();
                    handleRepositoryError(e_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    "docs:list": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, password, response, e_4;
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
                    logger_1.default.info("\n        [Your documents]\n      ");
                    response.docs.forEach(function (doc) {
                        logger_1.default.info("- " + doc.name + " : " + doc.token + " @ " + doc.full_subdomain);
                    });
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _b.sent();
                    handleRepositoryError(e_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    init: function (args) { return __awaiter(_this, void 0, void 0, function () {
        var token, response, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cli_1.default.promptToken()];
                case 1:
                    token = (_a.sent()).token;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, repository_1.default.singleDocument(token)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, configHandler_1.default.createConfigFile(token, response.doc.name)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_5 = _a.sent();
                    handleRepositoryError(e_5);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    publish: function (args) { return __awaiter(_this, void 0, void 0, function () {
        var _a, token, pages, sourcePath, generatedPages, result, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, configHandler_1.default.readConfigFile()];
                case 1:
                    _a = _b.sent(), token = _a.token, pages = _a.pages, sourcePath = _a.sourcePath;
                    if (token == null && pages != null && args.length > 0) {
                        token = args[0];
                    }
                    if (sourcePath != null) {
                        pages = pages.map(function (p) { return path_1.default.join(sourcePath, p); });
                    }
                    generatedPages = documentHandler_1.default.loadPages(pages);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, repository_2.default.publish(token, generatedPages)];
                case 3:
                    result = _b.sent();
                    logger_1.default.info("\n        Succesfully updated your documentation!\n        Your site is available at: " + result.doc.full_subdomain + "\n      ");
                    return [3 /*break*/, 5];
                case 4:
                    e_6 = _b.sent();
                    handleRepositoryError(e_6);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    "subdomain:set": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authHandler_1.default.getToken()];
                case 1:
                    token = _a.sent();
                    if (token == null)
                        return [2 /*return*/];
                    updateSubdomain(token);
                    return [2 /*return*/];
            }
        });
    }); }
    // "domains:add": async (args: string[]) => {
    //   let { token } = await configHandler.readConfigFile()
    //   if (token == null) {
    //     token = (await cli.promptToken()).token
    //   }
    //   if (token == null) return
    //   const { domain } = await cli.promptDomain()
    //   try {
    //     await repotisory.addDomain(token, domain)
    //     logger.info("Your domain has been added, it might take a minute for the ssl certificate to be generated.")
    //   } catch (e) {
    //     handleRepositoryError(e)
    //   }
    // }
};
function updateSubdomain(token) {
    return __awaiter(this, void 0, void 0, function () {
        var subdomain, result, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cli_1.default.promptSubdomain()];
                case 1:
                    subdomain = (_a.sent()).subdomain;
                    if (subdomain == null)
                        return [2 /*return*/];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, repository_1.default.tryAddingSubdomain(token, subdomain)];
                case 3:
                    result = _a.sent();
                    logger_1.default.info("\n      Your site is now available at: " + result.doc.full_subdomain + "\n    ");
                    return [3 /*break*/, 5];
                case 4:
                    e_7 = _a.sent();
                    if (e_7.response.status === 400) {
                        logger_1.default.info("Subdomain \"" + subdomain + "\" has already been taken.");
                        updateSubdomain(token);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function handleRepositoryError(e) {
    if (e.response.status != null) {
        if (e.response.status === 401) {
            logger_1.default.error("Unauthorized");
            return;
        }
    }
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
