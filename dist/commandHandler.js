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
var configHandler_1 = __importDefault(require("./configHandler"));
var documentHandler_1 = __importDefault(require("./documentHandler"));
var repository_1 = __importDefault(require("./repository"));
var path_1 = __importDefault(require("path"));
var authHandler_1 = __importDefault(require("./authHandler"));
var initHandler_1 = __importDefault(require("./initHandler"));
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
        var invitation, e_1, email, validationResult, password, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.default.info("\n      Registration is currently only possible after an invitation.\n      If you would to use Gendocs please send an email to ian@invacto.com\n    ");
                    return [4 /*yield*/, cli_1.default.promptInvitation()];
                case 1:
                    invitation = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, repository_1.default.validateInvitation(invitation)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    if (e_1.response.status === 401) {
                        logger_1.default.info("\n          The given invitation is invalid or has already been used.\n        ");
                    }
                    else {
                        throw e_1;
                    }
                    return [2 /*return*/];
                case 5: return [4 /*yield*/, cli_1.default.promptEmail()];
                case 6:
                    email = _a.sent();
                    return [4 /*yield*/, repository_1.default.doesEmailExist(email)];
                case 7:
                    validationResult = _a.sent();
                    if (validationResult.exists) {
                        logger_1.default.info("\n        That email address has already been used.\n      ");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, cli_1.default.promptPassword()];
                case 8:
                    password = _a.sent();
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, repository_1.default.createUser(invitation, email, password)];
                case 10:
                    _a.sent();
                    logger_1.default.info("Registration was succesful!");
                    return [3 /*break*/, 12];
                case 11:
                    e_2 = _a.sent();
                    if (e_2.response.status === 401) {
                        logger_1.default.info("\n          The given invitation is invalid or has already been used.\n        ");
                        return [2 /*return*/];
                    }
                    throw e_2;
                case 12: return [2 /*return*/];
            }
        });
    }); },
    "docs:create": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var email, password, name, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cli_1.default.promptEmail()];
                case 1:
                    email = _a.sent();
                    return [4 /*yield*/, cli_1.default.promptPassword()];
                case 2:
                    password = _a.sent();
                    return [4 /*yield*/, cli_1.default.promptDocName()];
                case 3:
                    name = _a.sent();
                    return [4 /*yield*/, repository_1.default.createDocument(name, email, password)];
                case 4:
                    response = _a.sent();
                    logger_1.default.info("\n      Document created successfully! \n      Your token: " + response.doc.token + "\n\n      Use \"gendocs init\" in the directory where you'd like your config file to live.\n\n      If you lose the token, try using \"gendocs docs:list\" to recover it.\n    ");
                    return [2 /*return*/];
            }
        });
    }); },
    "docs:list": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var email, password, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cli_1.default.promptEmail()];
                case 1:
                    email = _a.sent();
                    return [4 /*yield*/, cli_1.default.promptPassword()];
                case 2:
                    password = _a.sent();
                    return [4 /*yield*/, repository_1.default.listDocuments(email, password)];
                case 3:
                    response = _a.sent();
                    logger_1.default.info("\n      [Your documents]\n    ");
                    response.docs.forEach(function (doc) {
                        logger_1.default.info("- " + doc.name + " : " + doc.token + " @ " + doc.full_subdomain);
                    });
                    return [2 /*return*/];
            }
        });
    }); },
    "docs:rename": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var token, name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authHandler_1.default.getToken()];
                case 1:
                    token = _a.sent();
                    if (token == null)
                        return [2 /*return*/];
                    return [4 /*yield*/, cli_1.default.promptDocName("New doc name:")];
                case 2:
                    name = _a.sent();
                    if (name == null)
                        return [2 /*return*/];
                    return [4 /*yield*/, repository_1.default.updateDocument(token, { name: name })];
                case 3:
                    _a.sent();
                    configHandler_1.default.updateConfig({ name: name });
                    logger_1.default.info("Doc has been updated.");
                    return [2 /*return*/];
            }
        });
    }); },
    "docs:remove": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var token, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cli_1.default.promptToken()];
                case 1:
                    token = _a.sent();
                    if (token == null)
                        return [2 /*return*/];
                    return [4 /*yield*/, repository_1.default.deleteDocument(token)];
                case 2:
                    data = _a.sent();
                    logger_1.default.info("Doc \"" + data.doc.name + "\" has been removed.");
                    return [2 /*return*/];
            }
        });
    }); },
    init: function (args) { return __awaiter(_this, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cli_1.default.promptToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, repository_1.default.singleDocument(token)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, initHandler_1.default.init(response.doc.name, token)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    publish: function (args) { return __awaiter(_this, void 0, void 0, function () {
        var config, token, pages, sourcePath, generatedPages, result, domains, text_1, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, configHandler_1.default.readConfigFile()];
                case 1:
                    config = _a.sent();
                    if (config == null) {
                        logger_1.default.error("\n        Config file could not be found.\n        Use \"gendocs init\" to generate the config file.\n      ");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, authHandler_1.default.getToken(args)];
                case 2:
                    token = _a.sent();
                    if (token == null) {
                        throw Error("\n        We couldn't find a token to authenticate you.\n        Please provide a token in one of these ways:\n          - in a gendocs-token file\n          - in a gendocs.json file\n          - as a argument to \"gendocs publish [token]\"\n      ");
                    }
                    sourcePath = config.sourcePath || "";
                    pages = config.pages.map(function (p) { return path_1.default.join(sourcePath, p); });
                    return [4 /*yield*/, documentHandler_1.default.loadPages(pages)];
                case 3:
                    generatedPages = _a.sent();
                    if (generatedPages.length === 0) {
                        logger_1.default.info("\n        No pages were found.\n        Please add your pages to gendocs.json.\n\n        Example:\n\n          {\n            name: \"" + config.name + "\",\n            token: \"***********\",\n            pages: [\n              \"./my_page\",\n            ]\n          }\n      ");
                        return [2 /*return*/];
                    }
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    if (config["token"] != null) {
                        delete config["token"];
                    }
                    return [4 /*yield*/, repository_1.default.publish(token, generatedPages, config)];
                case 5:
                    result = _a.sent();
                    if (result.doc.subdomain == null && result.domains.length == 0) {
                        logger_1.default.info("\n        Succesfully updated your documentation!\n        You don't seem to have selected a subdomain yet.\n        \n        Please select a subdomain using the command: gendocs subdomain:set\n        or\n        Add your own custom domain using the command: gendocs domains:add\n        ");
                    }
                    else {
                        domains = result.domains;
                        if (result.doc.subdomain != null) {
                            domains.push({ full_url: result.doc.full_subdomain });
                        }
                        text_1 = "\n        Succesfully updated your documentation!\n\n        Your site is available at:";
                        domains.forEach(function (domain) {
                            text_1 += "\n\t   - " + domain.full_url;
                        });
                        logger_1.default.info(text_1 + "\n");
                    }
                    return [3 /*break*/, 7];
                case 6:
                    e_3 = _a.sent();
                    if (e_3.response.status === 403) {
                        logger_1.default.info("\n          You've hit the publishes/minute limit. Please wait a minute before you try again.\n        ");
                        return [2 /*return*/];
                    }
                    throw e_3;
                case 7: return [2 /*return*/];
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
    }); },
    "domains:add": function (args) { return __awaiter(_this, void 0, void 0, function () {
        var token, domain, timeout, interval;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authHandler_1.default.getToken()];
                case 1:
                    token = _a.sent();
                    if (token == null)
                        return [2 /*return*/];
                    return [4 /*yield*/, cli_1.default.promptDomain()];
                case 2:
                    domain = _a.sent();
                    return [4 /*yield*/, repository_1.default.addDomain(token, domain)];
                case 3:
                    _a.sent();
                    logger_1.default.info("\n    Generating SSL Certificate...\n    ");
                    interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, repository_1.default.domainStatus(domain)];
                                case 1:
                                    result = _a.sent();
                                    if (result.status === "ok") {
                                        logger_1.default.info("\n    Your domain has been added!\n    The site is now available at https://" + domain + "/\n        ");
                                        if (timeout != null) {
                                            clearTimeout(timeout);
                                        }
                                        clearInterval(interval);
                                        return [2 /*return*/];
                                    }
                                    if (result.status === "pending") {
                                        return [2 /*return*/];
                                    }
                                    if (result.status === "error") {
                                        if (result.context == "invalid_domain") {
                                            logger_1.default.info("\n    The domain \"" + domain + "\" seems to be malformed.\n    Please make sure your domain is in the format somedomain.com\n          ");
                                            return [2 /*return*/];
                                        }
                                        logger_1.default.error("\n    Something seems to have gone wrong while trying to generate your ssl certificates.\n    Error code: " + result.context + "\n        ");
                                        if (timeout != null) {
                                            clearTimeout(timeout);
                                        }
                                        clearInterval(interval);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 500);
                    timeout = setTimeout(function () {
                        logger_1.default.error("Something seems to have gone wrong. Please contact us through our github.");
                        clearInterval(interval);
                    }, 20000);
                    return [2 /*return*/];
            }
        });
    }); }
};
function updateSubdomain(token) {
    return __awaiter(this, void 0, void 0, function () {
        var subdomain, result, e_4;
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
                    e_4 = _a.sent();
                    if (e_4.response.status === 400) {
                        logger_1.default.info("Subdomain \"" + subdomain + "\" has already been taken.");
                        updateSubdomain(token);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function handleCommandHandlerError(e) {
    if (e.response == null) {
        logger_1.default.error(e.message, e);
        return;
    }
    if (e.response.status != null) {
        if (e.response.status === 401) {
            logger_1.default.error("Unauthorized");
            return;
        }
    }
    if (e.response != null && e.response.data != null && e.response.data.errors != null) {
        var errors = e.response.data.errors;
        for (var key in errors) {
            if (typeof errors[key] === "string") {
                logger_1.default.error(errors[key]);
            }
            else {
                for (var _i = 0, _a = errors[key]; _i < _a.length; _i++) {
                    var message = _a[_i];
                    logger_1.default.error(key + " " + message);
                }
            }
        }
    }
    else {
        logger_1.default.error(e.message);
    }
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var command, args, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.argv.length < 3) {
                        logger_1.default.info(commandMessages_1.default.help());
                        return [2 /*return*/];
                    }
                    command = process.argv[2];
                    if (!(command in _handlers)) {
                        logger_1.default.info(commandMessages_1.default.help());
                        return [2 /*return*/];
                    }
                    args = [];
                    if (process.argv.length > 3) {
                        args = process.argv.slice(3);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.resolve(_handlers[command](args))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    handleCommandHandlerError(e_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    run: run
};
