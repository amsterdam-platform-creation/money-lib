import type { Money } from "../types";
import type { ChainedMoneyV2, MoneyV2 } from "./types";
export declare const isMoneyChain: <CC extends string, CS extends string>(m: any) => m is ChainedMoneyV2<CC, CS>;
export declare const parseMoneyInput: <CC extends string, CS extends string>(input?: MoneyV2<CC, CS> | ChainedMoneyV2<CC, CS>) => Money;
