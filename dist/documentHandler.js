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
var fs_1 = __importDefault(require("fs"));
var gray_matter_1 = __importDefault(require("gray-matter"));
var markdownParser_1 = __importDefault(require("./markdownParser"));
var util_1 = __importDefault(require("./util"));
function loadPages(paths) {
    return __awaiter(this, void 0, void 0, function () {
        var pages, index, _i, paths_1, path, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pages = [];
                    index = 0;
                    _i = 0, paths_1 = paths;
                    _a.label = 1;
                case 1:
                    if (!(_i < paths_1.length)) return [3 /*break*/, 4];
                    path = paths_1[_i];
                    return [4 /*yield*/, loadPage(path, index++)];
                case 2:
                    page = _a.sent();
                    pages.push(page);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    ensureSlugsAreUnique(pages);
                    return [2 /*return*/, pages];
            }
        });
    });
}
function loadPage(filePath, index) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent, matterResult, markdown, metaData, slug, html, checksum, codeLanguages, menuItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = ensureFileEndsWithMD(filePath);
                    validateFileExists(filePath);
                    fileContent = fs_1.default.readFileSync(filePath, "utf-8");
                    matterResult = gray_matter_1.default(fileContent);
                    markdown = matterResult.content;
                    metaData = validateMetaData(matterResult.data);
                    slug = generateSlug(metaData.category, metaData.title);
                    return [4 /*yield*/, markdownParser_1.default.parseMarkdown(markdown)];
                case 1:
                    html = _a.sent();
                    checksum = util_1.default.checksumForString(markdown);
                    codeLanguages = markdownParser_1.default.findUsedCodeLanguagesInMarkdown(markdown);
                    menuItems = markdownParser_1.default.findMenuItems(markdown);
                    return [2 /*return*/, {
                            category: metaData.category,
                            title: metaData.title,
                            slug: slug,
                            markdown: fileContent,
                            html: html,
                            path: filePath,
                            checksum: checksum,
                            codeLanguages: codeLanguages,
                            menuItems: menuItems,
                            order: index
                        }];
            }
        });
    });
}
function ensureSlugsAreUnique(pages) {
    var slugMap = {};
    for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
        var page = pages_1[_i];
        if (slugMap[page.slug] == null) {
            slugMap[page.slug] = page;
        }
        else {
            throw Error("\n        Pages with path \"" + page.path + "\" and \"" + slugMap[page.slug].path + "\" have the same generated slug: " + page.slug + ".\n        Please make sure all pages have different a title and category.\n      ");
        }
    }
}
function generateSlug(category, title) {
    return makeStringUrlSafe(category.toLowerCase()) + "-" + makeStringUrlSafe(title.toLowerCase());
}
function makeStringUrlSafe(str) {
    return str.replace(" ", "_").replace(/[^a-zA-Z0-9_]/g, "");
}
function ensureFileEndsWithMD(filePath) {
    if (!filePath.endsWith(".md")) {
        filePath += ".md";
    }
    return filePath;
}
function validateFileExists(filePath) {
    if (!fs_1.default.existsSync(filePath)) {
        throw Error("\n      File at filePath \"" + filePath + "\" does not exist yet it is defined in the gendocs.json file.\n    ");
    }
}
function validateMetaData(metaData) {
    if (metaData.title == null || metaData.category == null) {
        throw Error("\n      Title and category are required in markdown files.\n\n      Example at the top of your file:\n        ---\n        category: \"My category\",\n        title: \"My title\"\n        ---\n    ");
    }
    return metaData;
}
exports.default = {
    loadPages: loadPages
};
