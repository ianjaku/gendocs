"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CodeExtension = /** @class */ (function () {
    function CodeExtension() {
    }
    CodeExtension.prototype.modifyRenderer = function (renderer) {
        renderer.code = function (code, language, isEscaped) {
            language = language.toLowerCase();
            if (language === "info") {
                return "\n          <div class=\"info\">\n            <div class=\"info__icon\"></div>\n            <div class=\"info__text\">" + code + "</div>\n          </div>\n        ";
            }
            return "\n        <div class=\"code\">\n          <div class=\"code__language\">" + language + "</div>\n          <pre class=\"code__value language-" + language + "\"><code class=\"language-" + language + "\">" + code + "</code></pre>\n        </div>\n      ";
        };
        return renderer;
    };
    return CodeExtension;
}());
exports.default = CodeExtension;
