"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var commandHandler_1 = __importDefault(require("./commandHandler"));
function run() {
    yargs_1.default();
    commandHandler_1.default.run();
}
exports.run = run;
exports.default = {
    run: run
};
/*
  Commands:
  - gendocs help
  - gendocs register
  - gendocs document:create
  
  - gendocs document:list
  - gendocs init [token]
  - gendocs publish
*/
