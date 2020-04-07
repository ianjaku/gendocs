"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _messages = {
    help: function () {
        return "\n      Available commands:\n        - help \n        - register\n        - document:create\n    ";
    },
    register: function () {
        return "\n      Registers a new user, prompts for the required data.\n    ";
    },
    "document:create": function () {
        return "\n      Create a new document, prompt for the required data\n    ";
    },
    "document:list": function () {
        return "\n      Lists all documents for the current user, prompt for the required data\n    ";
    }
};
exports.default = _messages;
