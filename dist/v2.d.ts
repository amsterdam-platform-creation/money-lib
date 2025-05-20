export declare const money: (input?: import("./lib/v2/types").MoneyV2<"EUR" | "USD" | "GBP" | "BTC", "€" | "$" | "£" | "₿"> | import("./lib/v2/types").ChainedMoneyV2<"EUR" | "USD" | "GBP" | "BTC", "€" | "$" | "£" | "₿"> | undefined, currency?: "EUR" | "USD" | "GBP" | "BTC" | "eur" | "usd" | "gbp" | "btc" | undefined) => import("./lib/v2/types").ChainedMoneyV2<"EUR" | "USD" | "GBP" | "BTC", "€" | "$" | "£" | "₿">;
export declare const setupMoney: <CC extends string, CS extends string>(cfg: import("./lib/v2/types").ConfigV2<CC, CS>) => {
    money: (input?: import("./lib/v2/types").MoneyV2<CC, CS> | import("./lib/v2/types").ChainedMoneyV2<CC, CS> | undefined, currency?: CC | Lowercase<CC> | undefined) => import("./lib/v2/types").ChainedMoneyV2<CC, CS>;
};
