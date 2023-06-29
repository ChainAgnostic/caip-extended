import {
  AccountId,
  AccountIdParams,
  AccountIdSplitParams,
  getParams,
} from "caip-common";
import { HederaChainId } from "./chain";
import { isValidHederaAccountId, isValidHederaAddress } from "./utils";

export class HederaAccountId extends AccountId {
  constructor(params: AccountIdParams | string) {
    super(params);

    if (typeof params === "string") {
      params = HederaAccountId.parse(params);
    }

    this.chainId = new HederaChainId(params.chainId);

    if (!isValidHederaAddress(params.address)) {
      throw new Error(`Invalid ${AccountId.spec.name} provided: ${params}`);
    }

    super.address = params.address;
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
}
