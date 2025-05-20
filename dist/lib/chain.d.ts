import type { ChainedMoney, Money } from "./types";
/**
 * @hint Use V2
 * @example import { money } from "money-lib/dist/v2"
 */
declare const moneyChain: {
    (money?: Money | ChainedMoney): ChainedMoney;
    config: (c: Partial<{
        currencies: Record<string, {
            code: string;
            symbol: string;
            precision: number;
        }>;
        defaultCurrency: string;
        locales: Record<string, {
            countryCode: string;
            decimalSeparator: "." | ",";
        }>;
        defaultLocale: string;
        defaultRoundingMethod: "bankers" | "up" | "down" | "round";
    }>) => void;
};
export default moneyChain;
