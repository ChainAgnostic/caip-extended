import { ChainId, ChainIdParams, getParams } from "caip-common";
import {
  isValidSolanaChainId,
  isValidSolanaNamespaceAndReference,
} from "./utils";

export class SolanaChainId extends ChainId {
  constructor(params: ChainIdParams | string) {
    super(params);

    if (typeof params === "string") {
      params = SolanaChainId.parse(params);
    }

    if (
      !isValidSolanaNamespaceAndReference(params.namespace, params.reference)
    ) {
      throw new Error(`Invalid ${ChainId.spec.name} provided: ${params}`);
    }

    super.namespace = params.namespace;
    super.reference = params.reference;
  }

  public static parse(id: string): ChainIdParams {
    if (!isValidSolanaChainId(id, super.spec)) {
      throw new Error(`Invalid solana ${super.spec.name} provided: ${id} `);
    }

    const chainIdParams = getParams<ChainIdParams>(id, super.spec);
    return new SolanaChainId(chainIdParams).toJSON();
  }
}
