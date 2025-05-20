"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = exports.getDefaultRounder = exports.getCurrency = exports.getLocale = exports.config = exports.defaultConfig = void 0;
const helpers_1 = require("./helpers");
exports.defaultConfig = {
    currencies: [
        {
            code: "EUR",
            symbol: "€",
            scale: 2,
        },
        {
            code: "USD",
            symbol: "$",
            scale: 2,
        },
        {
            code: "GBP",
            symbol: "£",
            scale: 2,
        },
        {
            code: "BTC",
            symbol: "₿",
            scale: 8,
        },
    ],
    defaultCurrency: "EUR",
    defaultRoundingMethod: "bankers",
};
exports.config = {
    defaultCurrency: "EUR",
    defaultLocale: "NL",
    defaultRoundingMethod: "bankers",
    currencies: {
        EUR: {
            code: "EUR",
            symbol: "€",
            precision: 2,
        },
        USD: {
            code: "USD",
            symbol: "$",
            precision: 2,
        },
        BTC: {
            code: "BTC",
            symbol: "₿",
            precision: 8,
        },
    },
    locales: {
        IE: {
            countryCode: "IE",
            decimalSeparator: ".",
        },
        NL: {
            countryCode: "NL",
            decimalSeparator: ",",
        },
    },
};
const getLocale = (locale = exports.config.defaultLocale) => ({
    ...exports.config.locales[locale],
});
exports.getLocale = getLocale;
const getCurrency = (currency = exports.config.defaultCurrency) => ({
    ...(exports.config.currencies[currency] ?? exports.config.currencies[exports.config.defaultCurrency]),
});
exports.getCurrency = getCurrency;
const getDefaultRounder = () => {
    switch (exports.config.defaultRoundingMethod) {
        case "bankers":
            return helpers_1.roundBank;
        case "up":
            return Math.ceil;
        case "down":
            return Math.floor;
        case "round":
            return Math.round;
        default:
            return helpers_1.roundBank;
    }
};
exports.getDefaultRounder = getDefaultRounder;
const validate = (c) => {
    if (!c) {
        throw new Error("money lib config invalid");
    }
};
const setConfig = (c) => {
    validate(Object.assign(exports.config, c));
};
exports.setConfig = setConfig;
