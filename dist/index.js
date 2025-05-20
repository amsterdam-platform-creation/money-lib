"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = exports.parse = exports.formatParts = exports.format = exports.split = exports.isValid = exports.isNegative = exports.isPositive = exports.isZero = exports.lessThanOrEqual = exports.lessThan = exports.greaterThanOrEqual = exports.greaterThan = exports.equals = exports.compare = exports.divide = exports.multiply = exports.subtract = exports.add = exports.toFloat = exports.toInt = exports.fromFloat = exports.fromInt = exports.zero = void 0;
const chain_1 = __importDefault(require("./lib/chain"));
exports.default = chain_1.default;
var core_1 = require("./lib/core");
// Initialization
Object.defineProperty(exports, "zero", { enumerable: true, get: function () { return core_1.zero; } });
Object.defineProperty(exports, "fromInt", { enumerable: true, get: function () { return core_1.fromInt; } });
Object.defineProperty(exports, "fromFloat", { enumerable: true, get: function () { return core_1.fromFloat; } });
// Serialization
Object.defineProperty(exports, "toInt", { enumerable: true, get: function () { return core_1.toInt; } });
Object.defineProperty(exports, "toFloat", { enumerable: true, get: function () { return core_1.toFloat; } });
// Arithmetics
Object.defineProperty(exports, "add", { enumerable: true, get: function () { return core_1.add; } });
Object.defineProperty(exports, "subtract", { enumerable: true, get: function () { return core_1.subtract; } });
Object.defineProperty(exports, "multiply", { enumerable: true, get: function () { return core_1.multiply; } });
Object.defineProperty(exports, "divide", { enumerable: true, get: function () { return core_1.divide; } });
// Comparison
Object.defineProperty(exports, "compare", { enumerable: true, get: function () { return core_1.compare; } });
Object.defineProperty(exports, "equals", { enumerable: true, get: function () { return core_1.equals; } });
Object.defineProperty(exports, "greaterThan", { enumerable: true, get: function () { return core_1.greaterThan; } });
Object.defineProperty(exports, "greaterThanOrEqual", { enumerable: true, get: function () { return core_1.greaterThanOrEqual; } });
Object.defineProperty(exports, "lessThan", { enumerable: true, get: function () { return core_1.lessThan; } });
Object.defineProperty(exports, "lessThanOrEqual", { enumerable: true, get: function () { return core_1.lessThanOrEqual; } });
Object.defineProperty(exports, "isZero", { enumerable: true, get: function () { return core_1.isZero; } });
Object.defineProperty(exports, "isPositive", { enumerable: true, get: function () { return core_1.isPositive; } });
Object.defineProperty(exports, "isNegative", { enumerable: true, get: function () { return core_1.isNegative; } });
// Validation
Object.defineProperty(exports, "isValid", { enumerable: true, get: function () { return core_1.isValid; } });
// Transformation
Object.defineProperty(exports, "split", { enumerable: true, get: function () { return core_1.split; } });
// Formatting
Object.defineProperty(exports, "format", { enumerable: true, get: function () { return core_1.format; } });
Object.defineProperty(exports, "formatParts", { enumerable: true, get: function () { return core_1.formatParts; } });
// Parsing
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return core_1.parse; } });
var config_1 = require("./lib/config");
Object.defineProperty(exports, "setConfig", { enumerable: true, get: function () { return config_1.setConfig; } });
