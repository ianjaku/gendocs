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
var marked_1 = __importDefault(require("marked"));
var HeadingsExtension_1 = __importDefault(require("./markdownExtension/HeadingsExtension"));
var CodeExtension_1 = __importDefault(require("./markdownExtension/CodeExtension"));
var extensions = [
    new HeadingsExtension_1.default(),
    new CodeExtension_1.default()
    // new ImageExtension()
];
function parseMarkdown(markdown) {
    return __awaiter(this, void 0, void 0, function () {
        var tokens, renderer, _i, extensions_1, extension, html, _a, extensions_2, extension;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tokens = marked_1.default.lexer(markdown);
                    renderer = new marked_1.default.Renderer();
                    _i = 0, extensions_1 = extensions;
                    _b.label = 1;
                case 1:
                    if (!(_i < extensions_1.length)) return [3 /*break*/, 6];
                    extension = extensions_1[_i];
                    if (!(extension.modifyTokens != null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.resolve(extension.modifyTokens(tokens))];
                case 2:
                    tokens = _b.sent();
                    _b.label = 3;
                case 3:
                    if (!(extension.modifyRenderer != null)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Promise.resolve(extension.modifyRenderer(renderer))];
                case 4:
                    renderer = _b.sent();
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    html = marked_1.default.parser(tokens, { renderer: renderer });
                    _a = 0, extensions_2 = extensions;
                    _b.label = 7;
                case 7:
                    if (!(_a < extensions_2.length)) return [3 /*break*/, 10];
                    extension = extensions_2[_a];
                    if (!(extension.modifyHTML != null)) return [3 /*break*/, 9];
                    return [4 /*yield*/, Promise.resolve(extension.modifyHTML(html))];
                case 8:
                    html = _b.sent();
                    _b.label = 9;
                case 9:
                    _a++;
                    return [3 /*break*/, 7];
                case 10: return [2 /*return*/, html];
            }
        });
    });
}
function findUsedCodeLanguagesInMarkdown(markdown) {
    var tokens = marked_1.default.lexer(markdown);
    return tokens.reduce(function (acc, curr) {
        if (curr.type === "info")
            return acc;
        if (curr.type === "code" && !acc.includes(curr.lang)) {
            acc.push(curr.lang.toLowerCase());
        }
        return acc;
    }, []);
}
function findMenuItems(markdown) {
    var tokens = marked_1.default.lexer(markdown);
    return tokens.reduce(function (acc, curr) {
        if (curr.type === "heading" && (curr.depth === 1 || curr.depth === 2)) {
            acc.push({
                value: curr.text,
                depth: curr.depth,
                slug: makeStringUrlSafe(curr.text)
            });
        }
        return acc;
    }, []);
}
function makeStringUrlSafe(str) {
    return str.toLowerCase().replace(" ", "_").replace(/[^a-zA-Z0-9_]/g, "");
}
exports.default = {
    parseMarkdown: parseMarkdown,
    findUsedCodeLanguagesInMarkdown: findUsedCodeLanguagesInMarkdown,
    findMenuItems: findMenuItems
};
