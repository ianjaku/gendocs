"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _messages = {
    help: function () {
        return "\n      Available commands:\n        - help \n        - register\n        - docs:create\n        - docs:list\n        - init\n        - publish\n        - subdomain:set\n    ";
    },
    register: function () {
        return "\n      Registers a new user, prompts for the required data.\n    ";
    },
    "docs:create": function () {
        return "\n      Create a new project, prompts for the required data\n    ";
    },
    "docs:list": function () {
        return "\n      Lists all projects for the current user, prompts for the required data\n    ";
    },
    init: function () {
        return "\n      Creates the gendocs.json file, prompts for the required data\n    ";
    },
    publish: function () {
        return "\n      Commits your files to the website.\n    ";
    },
    "subdomain:set": function () {
        return "\n      Change the subdomain for a project, promts for the required data.\n    ";
    }
};
exports.default = _messages;
