import { ChainId, ChainIdParams, getParams } from "caip-common";
import { isValidWavesChainId } from "./utils";

export class WavesChainId extends ChainId {
  constructor(params: ChainIdParams | string) {
    super(params);

    if (typeof params === "string") {
      params = WavesChainId.parse(params);
    }

    // todo check that chainIdParams also match the correct standard practice
    super.namespace = params.namespace;
    super.reference = params.reference;
  }

  public static parse(id: string): ChainIdParams {
    if (!isValidWavesChainId(id, super.spec)) {
      throw new Error(`Invalid waves ${super.spec.name} provided: ${id} `);
    }

    const chainIdParams = getParams<ChainIdParams>(id, super.spec);
    return new ChainId(chainIdParams).toJSON();
  }
}
