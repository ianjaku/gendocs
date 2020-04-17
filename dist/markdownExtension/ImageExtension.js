"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileHandler_1 = __importDefault(require("../fileHandler"));
var authHandler_1 = __importDefault(require("../authHandler"));
var path_1 = __importDefault(require("path"));
var form_data_1 = __importDefault(require("form-data"));
var repository_1 = __importDefault(require("../repository"));
var util_1 = __importDefault(require("../util"));
var ImageExtension = /** @class */ (function () {
    function ImageExtension() {
        this.images = {};
    }
    ImageExtension.prototype.modifyRenderer = function (renderer) {
        var _this = this;
        renderer.image = function (path, hoverText, altText) {
            _this.images[path] = path;
            return "<img alt=\"" + altText + "\" src=\"" + path + "\" />";
        };
        return renderer;
    };
    ImageExtension.prototype.modifyHTML = function (html) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, path_2, uploadedPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = Object.values(this.images);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        path_2 = _a[_i];
                        if (!this.isPathLocal(path_2))
                            return [3 /*break*/, 3];
                        return [4 /*yield*/, this.uploadImage(path_2)];
                    case 2:
                        uploadedPath = _b.sent();
                        html = html.replace(path_2, uploadedPath);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, html];
                }
            });
        });
    };
    ImageExtension.prototype.isPathLocal = function (path) {
        return !path.startsWith("http") && fileHandler_1.default.fileExists(path);
    };
    ImageExtension.prototype.uploadImage = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var form, fileSize, hash, _a, _b, _c, result, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        form = new form_data_1.default();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        fileSize = fileHandler_1.default.fileSize(filePath);
                        hash = util_1.default.checksumForString(filePath + "|" + fileSize);
                        _b = (_a = form).append;
                        _c = ['token'];
                        return [4 /*yield*/, authHandler_1.default.getToken()];
                    case 2:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        form.append('file', fileHandler_1.default.createReadStream(filePath), path_1.default.basename(filePath));
                        form.append('hash', hash);
                        return [4 /*yield*/, repository_1.default.uploadFile(form)];
                    case 3:
                        result = _d.sent();
                        return [2 /*return*/, result.path];
                    case 4:
                        e_1 = _d.sent();
                        throw Error("Failed" + e_1.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ImageExtension;
}());
exports.default = ImageExtension;
// renderer.image = function (path: string, hoverText: string, altText: string) {
//   if (!path.startsWith("http") && fileHandler.fileExists(path)) {
//     try {
//       // const contents = fileHandler.readFileSync(path)
//       const form = new FormData();
//       form.append('file', fileHandler.createReadStream(path), "img2.bmp");
//       form.append('token', 'some_token')
//       // form.submit("http://localhost:4000/api/v1/files")
//       repository.uploadFile(form).catch(e => console.log(e))
//     } catch (e) {
//       console.log("Error:", e)
//     }
//     throw Error("finished")
//   }
//   return `<img src="${path}" alt="${altText}" />`
// }
