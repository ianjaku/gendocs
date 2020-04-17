"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HeadingsExtension = /** @class */ (function () {
    function HeadingsExtension() {
    }
    HeadingsExtension.prototype.modifyRenderer = function (renderer) {
        var _this = this;
        renderer.heading = function (text, level) {
            return "\n        <h" + (level + 1) + " id=\"" + _this.makeStringUrlSafe(text) + "\">\n          " + text + "\n        </h" + (level + 1) + ">\n      ";
        };
        return renderer;
    };
    HeadingsExtension.prototype.makeStringUrlSafe = function (str) {
        return str.toLowerCase().replace(" ", "_").replace(/[^a-zA-Z0-9_]/g, "");
    };
    return HeadingsExtension;
}());
exports.default = HeadingsExtension;
