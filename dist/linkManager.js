"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("./util"));
var path_1 = __importDefault(require("path"));
var fileHandler_1 = __importDefault(require("./fileHandler"));
var _localLinks = {};
var _slugs = {};
function registerLocalLink(target) {
    var hash = util_1.default.checksumForString(target);
    _localLinks[hash] = target;
    return "GOTO|" + hash + "|";
}
function registerSlug(absolutePath, slug) {
    _slugs[absolutePath] = slug;
}
function solveLocalLinks(page) {
    var matches = page.html.match(/GOTO\|[a-zA-Z0-9]+\|/g);
    if (matches == null)
        return page;
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var match = matches_1[_i];
        var hash = match.slice(5, match.length - 1);
        var target = _localLinks[hash];
        if (target == null)
            return page;
        var absolutePath = path_1.default.resolve(path_1.default.dirname(page.path), target);
        if (!fileHandler_1.default.fileExists(absolutePath)) {
            throw Error("\n        We couldn't find the file you were linking to.\n        Link target: " + absolutePath + "\n        In file: " + page.path + "\n\n        Make sure all pages have been added to your gendocs.json file.\n      ");
        }
        var slug = _slugs[absolutePath];
        page.html = page.html.replace(match, "/" + slug);
    }
    return page;
}
exports.default = {
    registerLocalLink: registerLocalLink,
    registerSlug: registerSlug,
    solveLocalLinks: solveLocalLinks
};
