"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
function promptCredentials() {
    return inquirer_1.default
        .prompt([
        {
            type: "input",
            name: "email",
            message: "Email: ",
            validate: function (value) {
                if (value != null && value.match(/@/)) {
                    return true;
                }
                return "Must be a valid email.";
            }
        },
        {
            type: "password",
            name: "password",
            message: "Password: ",
            validate: function (value) {
                if (value != null && value.length > 7) {
                    return true;
                }
                return "Password must be at least 8 characters long";
            }
        }
    ]);
}
function promptCreateDocument() {
    return inquirer_1.default
        .prompt([
        {
            type: "input",
            name: "name",
            message: "Document name: "
        }
    ]);
}
function promptToken() {
    return inquirer_1.default
        .prompt([
        {
            type: "input",
            name: "token",
            message: "Token: "
        }
    ]);
}
function promptConfirm(message) {
    return inquirer_1.default
        .prompt([
        {
            type: "confirm",
            name: "result",
            message: message
        }
    ]);
}
exports.default = {
    promptCredentials: promptCredentials,
    promptCreateDocument: promptCreateDocument,
    promptToken: promptToken,
    promptConfirm: promptConfirm
};
