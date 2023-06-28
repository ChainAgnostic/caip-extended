import { ChainId, ChainIdParams, getParams } from "caip-common";
import {
  isValidEIP155ChainIdNamespaceAndReference,
  isValidEIP155ChainId,
} from "./utils";

export class EIP155ChainId extends ChainId {
  constructor(params: ChainIdParams | string) {
    super(params);

    if (typeof params === "string") {
      params = EIP155ChainId.parse(params);
    }

    if (
      !isValidEIP155ChainIdNamespaceAndReference(
        params.namespace,
        params.reference
      )
    ) {
      throw new Error(`Invalid ${ChainId.spec.name} provided: ${params}`);
    }
    this.namespace = params.namespace;
    this.reference = params.reference;
  }

  public static parse(id: string): ChainIdParams {
    if (!isValidEIP155ChainId(id, this.spec)) {
      throw new Error(`Invalid eip-155 ${this.spec.name} provided: ${id} `);
    }

    const chainIdParams = getParams<ChainIdParams>(id, this.spec);
    return new EIP155ChainId(chainIdParams).toJSON();
  }
}
