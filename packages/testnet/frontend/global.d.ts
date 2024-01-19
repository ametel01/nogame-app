export interface ProcessEnv {
  ALCHEMY_API_KEY: string;
}

export type ColonyArrayElement = [bigint, { orbit: bigint; system: bigint }];
export type ColonyArray = ColonyArrayElement[];
