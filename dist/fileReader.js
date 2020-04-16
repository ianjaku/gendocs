"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
function readFileSync(path) {
    var buffer = fs_1.default.readFileSync(path);
    return buffer.toString('utf-8');
}
function readJSONFileSync(path) {
    var resultJSON = readFileSync(path);
    return JSON.parse(resultJSON);
}
function fileExists(path) {
    return fs_1.default.existsSync(path);
}
exports.default = {
    readFileSync: readFileSync,
    readJSONFileSync: readJSONFileSync
};
