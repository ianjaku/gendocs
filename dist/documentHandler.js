"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var gray_matter_1 = __importDefault(require("gray-matter"));
var crypto_1 = __importDefault(require("crypto"));
var markdownParser_1 = __importDefault(require("./markdownParser"));
function loadPages(paths) {
    var pages = paths.map(function (path, index) { return loadPage(path, index); });
    ensureSlugsAreUnique(pages);
    return pages;
}
function loadPage(filePath, index) {
    filePath = ensureFileEndsWithMD(filePath);
    validateFileExists(filePath);
    var fileContent = fs_1.default.readFileSync(filePath, "utf-8");
    var matterResult = gray_matter_1.default(fileContent);
    var markdown = matterResult.content;
    var metaData = validateMetaData(matterResult.data);
    var slug = generateSlug(metaData.category, metaData.title);
    var html = markdownParser_1.default.parseMarkdown(markdown);
    var checksum = checksumForString(markdown);
    var codeLanguages = markdownParser_1.default.findUsedCodeLanguagesInMarkdown(markdown);
    var menuItems = markdownParser_1.default.findMenuItems(markdown);
    return {
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
    };
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
function checksumForString(contentJson) {
    return crypto_1.default.createHash("md5").update(contentJson).digest("hex");
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
