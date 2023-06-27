import { ChainId, ChainIdParams, getParams, isValidId } from "caip-common";
import {
  isValidHederaChainId,
  isValidHederaNamespaceAndReference,
} from "./utils";

export class HederaChainId extends ChainId {
  constructor(params: ChainIdParams | string) {
    super(params);

    if (typeof params === "string") {
      params = HederaChainId.parse(params);
    }

    if (
      !isValidHederaNamespaceAndReference(params.namespace, params.reference)
    ) {
      throw new Error(
        `Invalid hedera ${ChainId.spec.name} provided: ${params}`
      );
    }

    this.namespace = params.namespace;
    this.reference = params.reference;
  }

  public static parse(id: string): ChainIdParams {
    if (!isValidHederaChainId(id, this.spec)) {
      throw new Error(`Invalid hedera ${this.spec.name} provided: ${id} `);
    }

    const chainIdParams = getParams<ChainIdParams>(id, this.spec);
    return new HederaChainId(chainIdParams).toJSON();
  }
}
