import { ChainId } from "./chain";
import { CAIP } from "./spec";
import { AccountIdParams, IdentifierSpec } from "./types";
import { joinParams } from "./utils";

export class AccountId {
  public static spec: IdentifierSpec = CAIP["10"];
  public chainId: ChainId;
  public address: string;

  constructor(params: AccountIdParams | string) {}

  public static format(params: AccountIdParams): string {
    const chainId = new ChainId(params.chainId);
    const chainIdJSON = chainId.toJSON();

    return joinParams(
      {
        address: params.address,
        chainId: {
          namespace: chainIdJSON.namespace,
          reference: chainIdJSON.reference,
        },
      },
      this.spec
    );
  }

  public toString(): string {
    return AccountId.format(this.toJSON());
  }

  public toJSON(): AccountIdParams {
    return {
      chainId: this.chainId.toJSON(),
      address: this.address,
    };
  }
}
