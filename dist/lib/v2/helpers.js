"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMoneyInput = exports.isMoneyChain = void 0;
const money = __importStar(require("../core"));
const types_1 = require("./types");
const config_1 = require("../config");
const isMoneyChain = (m) => {
    return typeof m === "object" && m !== null && types_1.symbolChain in m;
};
exports.isMoneyChain = isMoneyChain;
const parseMoneyInput = (input) => {
    if (input === undefined || input === null) {
        return { amount: 0, currency: config_1.config.defaultCurrency };
    }
    if (typeof input === "object" && "cents" in input && "currency" in input) {
        return money.fromInt(input.cents, input.currency);
    }
    if (typeof input === "object" && "decimal" in input && "currency" in input) {
        return money.fromFloat(input.decimal, input.currency);
    }
    if (typeof input === "number") {
        return money.fromFloat(input, config_1.config.defaultCurrency);
    }
    if ((0, exports.isMoneyChain)(input)) {
        return input.json();
    }
    if (money.isValid(input)) {
        return input;
    }
    let stringInput = input.trim().toLocaleUpperCase();
    const hasCents = stringInput.includes("CENTS");
    stringInput = stringInput.replace("CENTS", "");
    const amount = parseFloat(stringInput
        .replace(/,/g, ".") // treat comma as decimal separator
        .replace(/[^-0-9.]/g, "") // remove non-number related
    ) || 0;
    const currencies = Object.values(config_1.config.currencies);
    const currency = currencies.find((c) => stringInput.startsWith(c.symbol)) ||
        currencies.find((c) => stringInput.endsWith(c.code));
    const from = hasCents ? money.fromInt : money.fromFloat;
    return from(amount, currency?.code ?? config_1.config.defaultCurrency);
};
exports.parseMoneyInput = parseMoneyInput;
