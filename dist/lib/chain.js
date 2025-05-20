"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const core_1 = require("./core");
// unwrap Money from chain, or init with zero value
const unwrap = (m) => {
    return (0, core_1.isValid)(m) ? m : m.toJSON();
};
/**
 * @hint Use V2
 * @example import { money } from "money-lib/dist/v2"
 */
const moneyChain = (money = (0, core_1.zero)()) => {
    const _m = unwrap(money);
    _m.currency = _m.currency || config_1.config.defaultCurrency;
    return {
        zero: () => moneyChain((0, core_1.zero)()),
        fromInt: (amount, currency) => moneyChain((0, core_1.fromInt)(amount, currency)),
        fromFloat: (amount, currency) => moneyChain((0, core_1.fromFloat)(amount, currency)),
        fromIntString: (amount, currency) => moneyChain((0, core_1.fromIntString)(amount, currency)),
        fromFloatString: (amount, currency) => moneyChain((0, core_1.fromFloatString)(amount, currency)),
        toInt: () => (0, core_1.toInt)(_m),
        toCents: () => (0, core_1.toInt)(_m),
        toFloat: () => (0, core_1.toFloat)(_m),
        toString: () => (0, core_1.toString)(_m),
        toIntString: () => (0, core_1.toString)(_m),
        toCentsString: () => (0, core_1.toString)(_m),
        toFloatString: () => (0, core_1.toFloatString)(_m),
        compare: (m) => (0, core_1.compare)(_m, unwrap(m)),
        equals: (m) => (0, core_1.equals)(_m, unwrap(m)),
        greaterThan: (m) => (0, core_1.greaterThan)(_m, unwrap(m)),
        greaterThanOrEqual: (m) => (0, core_1.greaterThanOrEqual)(_m, unwrap(m)),
        lessThan: (m) => (0, core_1.lessThan)(_m, unwrap(m)),
        lessThanOrEqual: (m) => (0, core_1.lessThanOrEqual)(_m, unwrap(m)),
        isZero: () => (0, core_1.isZero)(_m),
        isPositive: () => (0, core_1.isPositive)(_m),
        isNegative: () => (0, core_1.isNegative)(_m),
        min: (m1, ...m) => moneyChain((0, core_1.min)(unwrap(m1), ...m.map(unwrap))),
        max: (m1, ...m) => moneyChain((0, core_1.max)(unwrap(m1), ...m.map(unwrap))),
        isValid: () => (0, core_1.isValid)(_m),
        split: () => (0, core_1.split)(_m),
        add: (m1, ...m) => moneyChain((0, core_1.add)(_m, unwrap(m1), ...m.map(unwrap))),
        subtract: (m1, ...m) => moneyChain((0, core_1.subtract)(_m, unwrap(m1), ...m.map(unwrap))),
        multiply: (multiplier, round = Math.round) => moneyChain((0, core_1.multiply)(_m, multiplier, round)),
        divide: (divider, round = Math.round) => moneyChain((0, core_1.divide)(_m, divider, round)),
        abs: () => moneyChain((0, core_1.abs)(_m)),
        format: (ops) => (0, core_1.format)(_m, ops),
        formatParts: (locale) => (0, core_1.formatParts)(_m, locale),
        parse: (s, currency, locale, decimalSeparator) => moneyChain((0, core_1.parse)(s, currency, locale, decimalSeparator)),
        debug: (prefix = "money:") => {
            console.log(prefix, _m);
            return moneyChain(_m);
        },
        toJSON: () => _m,
    };
};
moneyChain.config = config_1.setConfig;
exports.default = moneyChain;
