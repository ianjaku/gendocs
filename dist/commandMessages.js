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
        return "\n      Create a new document, prompts for the required data\n    ";
    },
    "document:list": function () {
        return "\n      Lists all documents for the current user, prompts for the required data\n    ";
    },
    init: function () {
        return "\n      Creates the gendocs.json file, prompts forn the required data\n    ";
    }
};
exports.default = _messages;
