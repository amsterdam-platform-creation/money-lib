import type { Cents, Money } from "./types";
export declare const zero: (currency?: string) => {
    amount: number;
    currency: string;
};
export declare const fromInt: (amount: Cents, currency?: string) => Money;
export declare const fromFloat: (amount: number, currency?: string, round?: (n: number, places?: number) => number) => Money;
export declare const fromIntString: (amount: string, currency?: string) => Money;
export declare const fromFloatString: (amount: string, currency?: string, round?: (n: number, places?: number) => number) => Money;
export declare const toInt: (m: Money) => Cents;
export declare const toFloat: (m: Money) => number;
export declare const toString: (m: Money) => string;
export declare const toFloatString: (m: Money) => string;
export declare const add: (m1: Money, m2: Money, ...m: Money[]) => Money;
export declare const subtract: (m1: Money, m2: Money, ...m: Money[]) => Money;
export declare const multiply: (m: Money, multiplier: number, // | Money
round?: (n: number, places?: number) => number) => Money;
export declare const divide: (m: Money, divider: number, // | Money
round?: (n: number, places?: number) => number) => Money;
export declare const abs: (m: Money) => Money;
export declare const compare: (a: Money, b: Money) => -1 | 0 | 1;
export declare const equals: (a: Money, b: Money) => boolean;
export declare const greaterThan: (a: Money, b: Money) => boolean;
export declare const greaterThanOrEqual: (a: Money, b: Money) => boolean;
export declare const lessThan: (a: Money, b: Money) => boolean;
export declare const lessThanOrEqual: (a: Money, b: Money) => boolean;
export declare const isZero: (m: Money) => boolean;
export declare const isPositive: (m: Money) => boolean;
export declare const isNegative: (m: Money) => boolean;
export declare const min: (m1: Money, ...m: Money[]) => Money;
export declare const max: (m1: Money, ...m: Money[]) => Money;
export declare const isValid: (m: any) => m is Money;
export declare const split: (m: Money) => {
    whole: number;
    cents: number;
};
export declare const format: (m: Money, ops?: {
    /**
     * - true: always show cents
     * - "no": never show cents
     * - false | "ifAny": show cents only if they are not zero
     */
    cents?: boolean | "ifAny" | "no";
    locale?: string;
    trailingZeros?: boolean;
    withPlusSign?: boolean;
    useGrouping?: boolean;
}) => string;
export declare const formatIntegerPart: (integerPart: number, locale?: string, useGrouping?: boolean) => string;
export declare const formatParts: (m: Money, locale?: string, useGrouping?: boolean) => {
    whole: string;
    wholeFormatted: string;
    cents: string;
    currencySymbol: string;
    decimalSeparator: string;
    sign: "+" | "-" | "";
};
export declare const parse: (s: string, currency: string, locale?: string, decimalSeparator?: "." | ",") => Money;
