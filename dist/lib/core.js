"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.formatParts = exports.formatIntegerPart = exports.format = exports.split = exports.isValid = exports.max = exports.min = exports.isNegative = exports.isPositive = exports.isZero = exports.lessThanOrEqual = exports.lessThan = exports.greaterThanOrEqual = exports.greaterThan = exports.equals = exports.compare = exports.abs = exports.divide = exports.multiply = exports.subtract = exports.add = exports.toFloatString = exports.toString = exports.toFloat = exports.toInt = exports.fromFloatString = exports.fromIntString = exports.fromFloat = exports.fromInt = exports.zero = void 0;
const config_1 = require("./config");
// ------ Initialization ------ //
const zero = (currency = config_1.config.defaultCurrency) => {
    return { amount: 0, currency };
};
exports.zero = zero;
const fromInt = (amount, currency = config_1.config.defaultCurrency) => {
    return { amount, currency };
};
exports.fromInt = fromInt;
const fromFloat = (amount, currency = config_1.config.defaultCurrency, round = (0, config_1.getDefaultRounder)()) => {
    const scale = getCurrencyScale((0, exports.zero)(currency));
    return {
        amount: round(amount * scale, 0),
        currency,
    };
};
exports.fromFloat = fromFloat;
const fromIntString = (amount, currency = config_1.config.defaultCurrency) => {
    const parsed = parseInt(amount, 10);
    return (0, exports.fromInt)(Number.isNaN(parsed) || parsed === 0 ? 0 : parsed, currency);
};
exports.fromIntString = fromIntString;
const fromFloatString = (amount, currency = config_1.config.defaultCurrency, round = (0, config_1.getDefaultRounder)()) => {
    const parsed = parseFloat(amount);
    return (0, exports.fromFloat)(Number.isNaN(parsed) || parsed === 0 ? 0 : parsed, currency, round);
};
exports.fromFloatString = fromFloatString;
// ------ Serialization ------ //
const toInt = (m) => {
    return m.amount;
};
exports.toInt = toInt;
const toFloat = (m) => {
    const scale = getCurrencyScale(m);
    const { whole, cents } = (0, exports.split)(m);
    return whole + cents / scale;
};
exports.toFloat = toFloat;
const toString = (m) => {
    return `${m.amount}`;
};
exports.toString = toString;
const toFloatString = (m) => {
    const scale = getCurrencyScale(m);
    const { whole, cents } = (0, exports.split)(m);
    return `${whole}.${cents.toString().padStart(Math.log10(scale), "0")}`;
};
exports.toFloatString = toFloatString;
// ------ Arithmetics ------ //
const add = (m1, m2, ...m) => {
    return {
        ...m1,
        amount: [m2, ...m].reduce((sum, curr) => sum + curr.amount, m1.amount),
    };
};
exports.add = add;
const subtract = (m1, m2, ...m) => {
    return {
        ...m1,
        amount: [m2, ...m].reduce((diff, curr) => diff - curr.amount, m1.amount),
    };
};
exports.subtract = subtract;
const multiply = (m, multiplier, // | Money
round = (0, config_1.getDefaultRounder)()) => {
    return (0, exports.fromInt)(round(m.amount * multiplier, 0), m.currency);
};
exports.multiply = multiply;
const divide = (m, divider, // | Money
round = (0, config_1.getDefaultRounder)()) => {
    return (0, exports.fromInt)(round(m.amount / divider, 0), m.currency);
};
exports.divide = divide;
const abs = (m) => {
    return {
        ...m,
        amount: Math.abs(m.amount),
    };
};
exports.abs = abs;
// ------ Comparison ------ //
const compare = (a, b) => {
    if (a.amount === b.amount) {
        return 0;
    }
    return a.amount > b.amount ? 1 : -1;
};
exports.compare = compare;
const equals = (a, b) => {
    return (0, exports.compare)(a, b) === 0;
};
exports.equals = equals;
const greaterThan = (a, b) => {
    return (0, exports.compare)(a, b) === 1;
};
exports.greaterThan = greaterThan;
const greaterThanOrEqual = (a, b) => {
    return (0, exports.compare)(a, b) >= 0;
};
exports.greaterThanOrEqual = greaterThanOrEqual;
const lessThan = (a, b) => {
    return (0, exports.compare)(a, b) === -1;
};
exports.lessThan = lessThan;
const lessThanOrEqual = (a, b) => {
    return (0, exports.compare)(a, b) <= 0;
};
exports.lessThanOrEqual = lessThanOrEqual;
const isZero = (m) => {
    return m.amount === 0;
};
exports.isZero = isZero;
const isPositive = (m) => {
    return m.amount > 0;
};
exports.isPositive = isPositive;
const isNegative = (m) => {
    return m.amount < 0;
};
exports.isNegative = isNegative;
const min = (m1, ...m) => {
    return [m1, ...m].reduce((acc, curr) => ((0, exports.lessThan)(acc, curr) ? acc : curr));
};
exports.min = min;
const max = (m1, ...m) => {
    return [m1, ...m].reduce((acc, curr) => (0, exports.greaterThan)(acc, curr) ? acc : curr);
};
exports.max = max;
// ------ Validation ------ //
const isValid = (m) => {
    return Boolean(typeof m === "object" &&
        (m.amount || m.amount === 0) &&
        (typeof m.currency === "undefined" ||
            (typeof m.currency === "string" &&
                m.currency.length > 0 &&
                !!(0, config_1.getCurrency)(m.currency))));
};
exports.isValid = isValid;
// ------ Transformation ------ //
const split = (m) => {
    const scale = getCurrencyScale(m);
    const whole = Math.trunc(m.amount / scale);
    const cents = m.amount - whole * scale;
    return { whole, cents };
};
exports.split = split;
// ------ Formatting ------ //
const format = (m, ops) => {
    const { cents, locale, trailingZeros, withPlusSign } = {
        cents: ops?.cents ?? true,
        locale: ops?.locale ?? config_1.config.defaultLocale,
        trailingZeros: ops?.trailingZeros ?? true,
        withPlusSign: ops?.withPlusSign ?? false,
    };
    const parts = (0, exports.formatParts)(m, locale, ops?.useGrouping);
    const signSymbol = parts.sign === "-" ? "-" : "";
    let formatted = "";
    if ((!cents || cents === "ifAny") &&
        parts.cents === "0".repeat((0, config_1.getCurrency)(m.currency).precision)) {
        formatted = `${signSymbol}${parts.currencySymbol}${parts.wholeFormatted}`;
    }
    else if (cents === "no") {
        formatted = `${signSymbol}${parts.currencySymbol}${parts.wholeFormatted}`;
    }
    else {
        formatted = `${signSymbol}${parts.currencySymbol}${parts.wholeFormatted}${parts.decimalSeparator}${parts.cents}`;
    }
    if (!trailingZeros) {
        formatted = formatted.replace(/0+$/, "");
    }
    if (withPlusSign && parts.sign === "+") {
        formatted = `+${formatted}`;
    }
    return formatted;
};
exports.format = format;
const formatIntegerPart = (integerPart, locale = config_1.config.defaultLocale, useGrouping = true) => {
    return new Intl.NumberFormat(locale, {
        useGrouping,
    }).format(integerPart);
};
exports.formatIntegerPart = formatIntegerPart;
const formatParts = (m, locale = config_1.config.defaultLocale, useGrouping) => {
    const { symbol, precision } = (0, config_1.getCurrency)(m.currency);
    const { decimalSeparator } = (0, config_1.getLocale)(locale);
    const { whole, cents } = (0, exports.split)(m);
    const absWhole = Math.abs(whole);
    const wholeFormatted = (0, exports.formatIntegerPart)(absWhole, locale, useGrouping);
    const sign = getAmountSign(m);
    return {
        whole: `${absWhole}`,
        wholeFormatted,
        cents: `${Math.abs(cents)}`.padStart(precision, "0"),
        currencySymbol: symbol,
        decimalSeparator,
        sign,
    };
};
exports.formatParts = formatParts;
// ------ Parsing ------ //
const parse = (s, currency, locale = config_1.config.defaultLocale, decimalSeparator) => {
    const _decimalSeparator = decimalSeparator ?? (0, config_1.getLocale)(locale).decimalSeparator;
    const amountFloatString = {
        ",": () => s
            .replace(/[^0-9.,]/g, "")
            .replace(/\./g, "")
            .replace(/\,/g, "."),
        ".": () => s.replace(/[^0-9.,]/g, "").replace(/\,/g, ""),
    }[_decimalSeparator]();
    const parsedFloat = parseFloat(amountFloatString);
    const amountFloat = Number.isNaN(parsedFloat) ? 0 : parsedFloat;
    return (0, exports.fromFloat)(amountFloat, currency);
};
exports.parse = parse;
// ------ Helper methods ------ //
const getCurrencyScale = (m) => {
    return 10 ** (0, config_1.getCurrency)(m.currency).precision;
};
const getAmountSign = (m) => {
    if (m.amount > 0) {
        return "+";
    }
    if (m.amount < 0) {
        return "-";
    }
    return "";
};
