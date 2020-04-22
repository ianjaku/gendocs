"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var linkManager_1 = __importDefault(require("../linkManager"));
var LinkExtension = /** @class */ (function () {
    function LinkExtension() {
    }
    LinkExtension.prototype.modifyRenderer = function (renderer) {
        renderer.link = function (href, title, text) {
            if (!href.startsWith("http")) {
                href = linkManager_1.default.registerLocalLink(href);
            }
            return "<a href=\"" + href + "\" title=\"" + title + "\">" + text + "</a>";
        };
        return renderer;
    };
    return LinkExtension;
}());
exports.default = LinkExtension;
