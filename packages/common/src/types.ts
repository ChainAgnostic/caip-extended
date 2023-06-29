export interface ParameterSpec {
  name: string;
  regex: string;
}

export interface IdentifierSpec extends ParameterSpec {
  parameters: {
    delimiter: string;
    values: {
      [index: string]: ParameterSpec;
    };
  };
}

export type KeyValue = { [key: string]: string };

export type Params = { [key: string]: string | KeyValue };

export interface ChainIdParams {
  namespace: string;
  reference: string;
}

export interface AccountIdSplitParams extends ChainIdParams {
  address: string;
}

export interface AccountIdParams {
  chainId: string | ChainIdParams;
  address: string;
}

export interface AssetNameParams {
  namespace: string;
  reference: string;
}

export interface AssetIdParams {
  chainId: string | ChainIdParams;
  assetName: string | AssetNameParams;
  tokenId: string;
}

export interface AssetTypeParams {
  chainId: string | ChainIdParams;
  assetName: string | AssetNameParams;
}

export interface AssetIdParams {
  chainId: string | ChainIdParams;
  assetName: string | AssetNameParams;
  tokenId: string;
}
