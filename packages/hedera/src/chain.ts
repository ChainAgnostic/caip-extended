import { ChainId, ChainIdParams, getParams, isValidId } from "caip-common";
import { isValidHederaChainId } from "./utils";

export class HederaChainId extends ChainId {
  constructor(params: ChainIdParams | string) {
    super(params);

    if (typeof params === "string") {
      params = HederaChainId.parse(params);
    }

    // todo check that chainIdParams also match the correct standard practice
    super.namespace = params.namespace;
    super.reference = params.reference;
  }

  public static parse(id: string): ChainIdParams {
    if (!isValidHederaChainId(id, super.spec)) {
      throw new Error(`Invalid hedera ${super.spec.name} provided: ${id} `);
    }

    const chainIdParams = getParams<ChainIdParams>(id, super.spec);
    return new ChainId(chainIdParams).toJSON();
  }
}
