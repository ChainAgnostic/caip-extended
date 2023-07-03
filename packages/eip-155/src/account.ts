import {
  AccountIdParams,
  getParams,
  AccountIdSplitParams,
  joinParams,
  IdentifierSpec,
  CAIP,
  isValidId,
} from "caip-common";
import { isValidEIP155AccountId, isValidEIP155ChecksumAddress } from "./utils";
import { EIP155ChainId } from "./chain";

export class EIP155AccountId {
  public static spec: IdentifierSpec = CAIP["10"];
  public chainId: EIP155ChainId;
  public address: string;

  constructor(params: AccountIdParams | string) {
    if (typeof params === "string") {
      params = EIP155AccountId.parse(params);
    }

    this.chainId = new EIP155ChainId(params.chainId);

    if (!isValidEIP155ChecksumAddress(params.address)) {
      throw new Error(
        `Invalid eip-155 ${EIP155AccountId.spec.name} provided: ${params}`
      );
    }

    this.address = params.address;
  }

  public static parse(id: string): AccountIdParams {
    if (!isValidId(id, this.spec)) {
      throw new Error(`Invalid eip-155 ${this.spec.name} provided: ${id} `);
    }

    if (!isValidEIP155AccountId(id)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }

    const { namespace, reference, address } = getParams<AccountIdSplitParams>(
      id,
      this.spec
    );
    const chainId = new EIP155ChainId({ namespace, reference });

    return new EIP155AccountId({ chainId, address }).toJSON();
  }

  public static format(params: AccountIdParams): string {
    const chainId = new EIP155ChainId(params.chainId);
    const splitParams: AccountIdSplitParams = {
      ...chainId.toJSON(),
      address: params.address,
    };
    return joinParams(splitParams as any, this.spec);
  }

  public toString(): string {
    return EIP155AccountId.format(this.toJSON());
  }

  public toJSON(): AccountIdParams {
    return {
      chainId: this.chainId.toJSON(),
      address: this.address,
    };
  }
}
