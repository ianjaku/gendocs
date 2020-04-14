"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function info(msg) {
    console.log(msg);
}
function error(msg, context) {
    if (context == null) {
        console.error("[GENDOCS ERROR] ", msg);
    }
    else {
        console.error("[GENDOCS ERROR] ", msg, context);
    }
}
exports.default = {
    info: info,
    error: error
};
