import type { ChainedMoneyV2, ConfigV2, MoneyV2 } from "./types";
/**
 * @beta This is an beta API V2.
 */
export declare const moneyChain: <CC extends string, CS extends string>(input?: MoneyV2<CC, CS> | ChainedMoneyV2<CC, CS>, currency?: CC | Lowercase<CC>) => ChainedMoneyV2<CC, CS>;
export declare const setupMoney: <CC extends string, CS extends string>(cfg: ConfigV2<CC, CS>) => {
    money: (input?: MoneyV2<CC, CS> | ChainedMoneyV2<CC, CS> | undefined, currency?: CC | Lowercase<CC> | undefined) => ChainedMoneyV2<CC, CS>;
};
