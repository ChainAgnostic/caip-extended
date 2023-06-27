import {
  AccountIdParams,
  getParams,
  AccountIdSplitParams,
  AccountId,
} from "caip-common";
import { isValidEIP155AccountId, isValidEIP155ChecksumAddress } from "./utils";
import { EIP155ChainId } from "./chain";

export class EIP155AccountId extends AccountId {
  constructor(params: AccountIdParams | string) {
    super(params);

    if (typeof params === "string") {
      params = EIP155AccountId.parse(params);
    }

    this.chainId = new EIP155ChainId(params.chainId);

    if (!isValidEIP155ChecksumAddress(params.address)) {
      throw new Error(`Invalid ${AccountId.spec.name} provided: ${params}`);
    }

    super.address = params.address;
  }

  public static parse(id: string): AccountIdParams {
    if (isValidEIP155AccountId(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }

    const { namespace, reference, address } = getParams<AccountIdSplitParams>(
      id,
      this.spec
    );
    const chainId = new EIP155ChainId({ namespace, reference });

    return new EIP155AccountId({ chainId, address }).toJSON();
  }
}
