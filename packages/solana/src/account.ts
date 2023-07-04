import {
  AccountIdParams,
  AccountIdSplitParams,
  CAIP,
  IdentifierSpec,
  getParams,
  isValidId,
  joinParams,
} from "caip-common";
import { SolanaChainId } from "./chain";
import { isValidSolanaAccountId, isValidSolanaAddress } from "./utils";

export class SolanaAccountId {
  public static spec: IdentifierSpec = CAIP["10"];
  public chainId: SolanaChainId;
  public address: string;

  constructor(params: AccountIdParams | string) {
    if (typeof params === "string") {
      params = SolanaAccountId.parse(params);
    }

    this.chainId = new SolanaChainId(params.chainId);

    if (!isValidSolanaAddress(params.address)) {
      throw new Error(
        `Invalid solana ${SolanaAccountId.spec.name} provided: ${params}`
      );
    }

    this.address = params.address;
  }

  public static parse(id: string): AccountIdParams {
    if (!isValidId(id, this.spec)) {
      throw new Error(`Invalid solana ${this.spec.name} provided: ${id}`);
    }
    if (!isValidSolanaAccountId(id)) {
      throw new Error(`Invalid solana ${this.spec.name} provided: ${id}`);
    }

    const { namespace, reference, address } = getParams<AccountIdSplitParams>(
      id,
      this.spec
    );
    const chainId = new SolanaChainId({ namespace, reference });

    return new SolanaAccountId({ chainId, address }).toJSON();
  }

  public static format(params: AccountIdParams): string {
    const chainId = new SolanaChainId(params.chainId);
    const splitParams: AccountIdSplitParams = {
      ...chainId.toJSON(),
      address: params.address,
    };
    return joinParams(splitParams as any, this.spec);
  }

  public toString(): string {
    return SolanaAccountId.format(this.toJSON());
  }

  public toJSON(): AccountIdParams {
    return {
      chainId: this.chainId.toJSON(),
      address: this.address,
    };
  }
}

// TODO check that only nft's could have tokenIds
