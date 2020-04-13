"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var marked_1 = __importDefault(require("marked"));
var renderer = new marked_1.default.Renderer();
renderer.heading = function (text, level) {
    return "\n    <h" + (level + 1) + " id=\"" + makeStringUrlSafe(text) + "\">\n      " + text + "\n    </h" + (level + 1) + ">\n  ";
};
renderer.code = function (code, language, isEscaped) {
    language = language.toLowerCase();
    if (language === "info") {
        return "\n      <div class=\"info\">\n        <div class=\"info__icon\"></div>\n        <div class=\"info__text\">" + code + "</div>\n      </div>\n    ";
    }
    return "\n    <div class=\"code\">\n      <div class=\"code__language\">" + language + "</div>\n      <pre class=\"code__value language-" + language + "\"><code class=\"language-" + language + "\">" + code + "</code></pre>\n    </div>\n  ";
};
function parseMarkdown(markdown) {
    return marked_1.default(markdown, { renderer: renderer });
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
