import {
  AccountIdParams,
  AccountIdSplitParams,
  CAIP,
  IdentifierSpec,
  getParams,
  joinParams,
} from "caip-common";
import { HederaChainId } from "./chain";
import { isValidHederaAccountId, isValidHederaAddress } from "./utils";

export class HederaAccountId {
  public static spec: IdentifierSpec = CAIP["10"];
  public chainId: HederaChainId;
  public address: string;

  constructor(params: AccountIdParams | string) {
    if (typeof params === "string") {
      params = HederaAccountId.parse(params);
    }

    this.chainId = new HederaChainId(params.chainId);

    if (!isValidHederaAddress(params.address)) {
      throw new Error(
        `Invalid ${HederaAccountId.spec.name} provided: ${params}`
      );
    }

    this.address = params.address;
  }

  public static parse(id: string): AccountIdParams {
    if (isValidHederaAccountId(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }

    const { namespace, reference, address } = getParams<AccountIdSplitParams>(
      id,
      this.spec
    );
    const chainId = new HederaChainId({ namespace, reference });

    return new HederaAccountId({ chainId, address }).toJSON();
  }

  public static format(params: AccountIdParams): string {
    const chainId = new HederaChainId(params.chainId);
    const splitParams: AccountIdSplitParams = {
      ...chainId.toJSON(),
      address: params.address,
    };
    return joinParams(splitParams as any, this.spec);
  }

  public toString(): string {
    return HederaAccountId.format(this.toJSON());
  }

  public toJSON(): AccountIdParams {
    return {
      chainId: this.chainId.toJSON(),
      address: this.address,
    };
  }
}
