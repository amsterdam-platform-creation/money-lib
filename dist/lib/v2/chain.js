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
exports.setupMoney = exports.moneyChain = void 0;
const money = __importStar(require("../core"));
const types_1 = require("./types");
const config_1 = require("../config");
const helpers_1 = require("./helpers");
/**
 * @beta This is an beta API V2.
 */
const moneyChain = (input, currency) => {
    const nextChain = (exports.moneyChain);
    const parse = (helpers_1.parseMoneyInput);
    const _m = parse(input);
    _m.currency = currency || _m.currency || config_1.config.defaultCurrency;
    const _chain = {
        int: () => money.toInt(_m),
        cents: () => money.toInt(_m),
        float: () => money.toFloat(_m),
        number: () => money.toFloat(_m),
        string: () => money.toFloatString(_m),
        centStr: () => money.toString(_m),
        cmp: (m) => money.compare(_m, parse(m)),
        eq: (m) => money.equals(_m, parse(m)),
        gt: (m) => money.greaterThan(_m, parse(m)),
        gte: (m) => money.greaterThanOrEqual(_m, parse(m)),
        lt: (m) => money.lessThan(_m, parse(m)),
        lte: (m) => money.lessThanOrEqual(_m, parse(m)),
        is0: () => money.isZero(_m),
        isPos: () => money.isPositive(_m),
        isNeg: () => money.isNegative(_m),
        min: (m1, ...m) => nextChain(money.min(parse(m1), ...m.map(parse))),
        max: (m1, ...m) => nextChain(money.max(parse(m1), ...m.map(parse))),
        validate: () => money.isValid(_m),
        split: () => {
            const split = money.split(_m);
            return {
                base: split.whole,
                cents: split.cents,
            };
        },
        add: (m1, ...m) => nextChain(money.add(_m, parse(m1), ...m.map(parse))),
        sub: (m1, ...m) => nextChain(money.subtract(_m, parse(m1), ...m.map(parse))),
        mul: (multiplier, round = Math.round) => nextChain(money.multiply(_m, multiplier, round)),
        div: (divider, round = Math.round) => nextChain(money.divide(_m, divider, round)),
        abs: () => nextChain(money.abs(_m)),
        fmt: (ops) => money.format(_m, ops),
        fmts: (locale) => {
            const fmtd = money.formatParts(_m, locale);
            return {
                base: fmtd.whole,
                cents: fmtd.cents,
                baseFormatted: fmtd.wholeFormatted,
                currencySymbol: fmtd.currencySymbol,
                decimalSeparator: fmtd.decimalSeparator,
                sign: fmtd.sign,
            };
        },
        parse: (s, currency) => {
            const parsed = parse(s);
            return nextChain({
                amount: parsed.amount,
                currency: currency ?? parsed.currency ?? config_1.config.defaultCurrency,
            });
        },
        debug: (prefix = "money:") => {
            console.log(prefix, {
                cents: _m.amount,
                currency: _m.currency,
            });
            return nextChain(_m);
        },
        json: () => _m,
        [types_1.symbolChain]: true,
    };
    return _chain;
};
exports.moneyChain = moneyChain;
const setupMoney = (cfg) => {
    (0, config_1.setConfig)({
        defaultCurrency: cfg.defaultCurrency,
        defaultRoundingMethod: cfg.defaultRoundingMethod,
        currencies: Object.fromEntries(cfg.currencies.map((c) => [
            c.code,
            {
                code: c.code,
                symbol: c.symbol,
                precision: c.scale,
            },
        ])),
    });
    return {
        money: (exports.moneyChain),
    };
};
exports.setupMoney = setupMoney;
