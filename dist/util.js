"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
function checksumForString(contentJson) {
    return crypto_1.default.createHash("md5").update(contentJson).digest("hex");
}
exports.default = {
    checksumForString: checksumForString
};
