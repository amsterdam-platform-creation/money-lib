type Config = {
    currencies: Record<string, Currency>;
    defaultCurrency: string;
    locales: Record<string, Locale>;
    defaultLocale: string;
    defaultRoundingMethod: "bankers" | "up" | "down" | "round";
};
type Currency = {
    /**
     * Currency code - can be any string
     */
    code: string;
    /**
     * Symbol to be used when formatting, eg. €
     */
    symbol: string;
    /**
     * Scaling factor
     */
    precision: number;
};
type Locale = {
    countryCode: string;
    decimalSeparator: "." | ",";
};
export declare const defaultConfig: {
    currencies: ({
        code: "EUR";
        symbol: "€";
        scale: number;
    } | {
        code: "USD";
        symbol: "$";
        scale: number;
    } | {
        code: "GBP";
        symbol: "£";
        scale: number;
    } | {
        code: "BTC";
        symbol: "₿";
        scale: number;
    })[];
    defaultCurrency: "EUR";
    defaultRoundingMethod: "bankers";
};
export declare const config: Config;
export declare const getLocale: (locale?: string) => {
    countryCode: string;
    decimalSeparator: "." | ",";
};
export declare const getCurrency: (currency?: string) => {
    /**
     * Currency code - can be any string
     */
    code: string;
    /**
     * Symbol to be used when formatting, eg. €
     */
    symbol: string;
    /**
     * Scaling factor
     */
    precision: number;
};
export declare const getDefaultRounder: () => (n: number, places?: number) => number;
export declare const setConfig: (c: Partial<Config>) => void;
export {};
