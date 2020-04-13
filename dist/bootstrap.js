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
  - gendocs docs:create
  - gendocs docs:list
  - gendocs init
  - gendocs publish

  - gendocs subdomain

  - gendocs domains:add
  - gendocs domains:list

  TODO: Show all urls to reach your page after publishing
  TODO: Show all urls in document listing

  // TODO: init should download the existing pages
  TODO: allow for token to be given with the gendocs publish [token] command so that it doesn't have to be loaded from the config.

  TODO: Invitation token to be able to join
  TODO: A way to create invitation tokens

  TODO: Custom URL

  TODO: show error when insert fails (when meilisearch is down for example)

  TODO: projects:rename

  TODO: projects:delete

  TODO: projects:get-token

  TODO: test if email exists before entering password
*/
