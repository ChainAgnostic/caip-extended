import { AssetIdParams, AssetTypeParams, AssetNameParams } from "caip-common";

// ChainId Data Points
export const CHAIN_ID_DELIMITER = ":";
export const CHAIN_ID_NAMESPACE = "solana";
export const CHAIN_ID_REFERENCE = "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp";
export const CHAIN_ID_STRING =
  CHAIN_ID_NAMESPACE + CHAIN_ID_DELIMITER + CHAIN_ID_REFERENCE;
export const CHAIN_ID_PARAMS = {
  namespace: CHAIN_ID_NAMESPACE,
  reference: CHAIN_ID_REFERENCE,
};

// AccountId Data Points
export const ACCOUNT_ID_DELIMITER = ":";
export const ACCOUNT_ID_ADDRESS =
  "7S3P4HxJpyyigGzodYwHtCxZyUQe9JiBMHyRWXArAaKv";
export const ACCOUNT_ID_STRING =
  CHAIN_ID_STRING + ACCOUNT_ID_DELIMITER + ACCOUNT_ID_ADDRESS;
export const ACCOUNT_ID_PARAMS = {
  chainId: CHAIN_ID_STRING,
  address: ACCOUNT_ID_ADDRESS,
};
export const ACCOUNT_ID_NESTED_PARAMS = {
  chainId: CHAIN_ID_PARAMS,
  address: ACCOUNT_ID_ADDRESS,
};

// Invalid AccountId Data Points
export const INVALID_ACCOUNT_ID_ADDRESS = "0x123";
export const INVALID_ACCOUNT_ID_STRING =
  CHAIN_ID_STRING + ACCOUNT_ID_DELIMITER + INVALID_ACCOUNT_ID_ADDRESS;
export const INVALID_ACCOUNT_ID_PARAMS = {
  chainId: CHAIN_ID_STRING,
  address: INVALID_ACCOUNT_ID_ADDRESS,
};

// AssetName Data Points
export const ASSET_NAME_DELIMITER = ":";
export const ASSET_NAMESPACE = "token";
export const ASSET_REFERENCE = "Fz6LxeUg5qjesYX3BdmtTwyyzBtMxk644XiTqU5W3w9w";
export const ASSET_NAME_STRING = `${ASSET_NAMESPACE}${ASSET_NAME_DELIMITER}${ASSET_REFERENCE}`;
export const ASSET_NAME_PARAMS: AssetNameParams = {
  namespace: ASSET_NAMESPACE,
  reference: ASSET_REFERENCE,
};

// Invalid AssetName Data Points
export const INVALID_ASSET_REFERENCE = "0x123";
export const INVALID_ASSET_NAME_STRING_WITH_INCORRECT_REFERENCE = `${ASSET_NAMESPACE}${ASSET_NAME_DELIMITER}${INVALID_ASSET_REFERENCE}`;
export const INVALID_ASSET_NAME_PARAMS_WITH_INCORRECT_REFERENCE: AssetNameParams =
  {
    namespace: ASSET_NAMESPACE,
    reference: INVALID_ASSET_REFERENCE,
  };

export const INVALID_ASSET_NAMESPACE = "erc123";
export const INVALID_ASSET_NAME_STRING_WITH_INCORRECT_NAMESPACE = `${INVALID_ASSET_NAMESPACE}${ASSET_NAME_DELIMITER}${ASSET_REFERENCE}`;
export const INVALID_ASSET_NAME_PARAMS_WITH_INCORRECT_NAMESPACE: AssetNameParams =
  {
    namespace: INVALID_ASSET_NAMESPACE,
    reference: ASSET_REFERENCE,
  };

// AssetType Data Points
export const ASSET_TYPE_STRING = `${CHAIN_ID_STRING}/${ASSET_NAME_STRING}`;
export const ASSET_TYPE_PARAMS: AssetTypeParams = {
  chainId: CHAIN_ID_STRING,
  assetName: ASSET_NAME_STRING,
};

export const ASSET_TYPE_NESTED_PARAMS: AssetTypeParams = {
  chainId: CHAIN_ID_PARAMS,
  assetName: ASSET_NAME_PARAMS,
};

// Invalid AssetType Data Points
export const INVALID_ASSET_TYPE_STRING = `${CHAIN_ID_STRING}/${INVALID_ASSET_NAME_STRING_WITH_INCORRECT_NAMESPACE}`;
export const INVALID_ASSET_TYPE_PARAMS: AssetTypeParams = {
  chainId: CHAIN_ID_STRING,
  assetName: INVALID_ASSET_TYPE_STRING,
};

export const INVALID_ASSET_TYPE_NESTED_PARAMS: AssetTypeParams = {
  chainId: CHAIN_ID_PARAMS,
  assetName: INVALID_ASSET_NAME_PARAMS_WITH_INCORRECT_NAMESPACE,
};

// AssetType Data Points
export const TOKEN_ID = "1";
export const ASSET_ID_STRING = `${ASSET_TYPE_STRING}/${TOKEN_ID}`;
export const ASSET_ID_PARAMS: AssetIdParams = {
  chainId: CHAIN_ID_STRING,
  assetName: ASSET_NAME_STRING,
  tokenId: TOKEN_ID,
};

export const ASSET_ID_NESTED_PARAMS: AssetIdParams = {
  chainId: CHAIN_ID_PARAMS,
  assetName: ASSET_NAME_PARAMS,
  tokenId: TOKEN_ID,
};

// Invalid AssetId Data Points
export const INVALID_TOKEN_ID = "**";
export const INVALID_ASSET_ID_STRING = `${INVALID_ASSET_TYPE_STRING}/${TOKEN_ID}`;
export const INVALID_ASSET_ID_PARAMS: AssetIdParams = {
  chainId: CHAIN_ID_STRING,
  assetName: ASSET_NAME_STRING,
  tokenId: INVALID_TOKEN_ID,
};

export const INVALID_ASSET_ID_NESTED_PARAMS: AssetIdParams = {
  chainId: CHAIN_ID_PARAMS,
  assetName: ASSET_NAME_PARAMS,
  tokenId: INVALID_TOKEN_ID,
};
