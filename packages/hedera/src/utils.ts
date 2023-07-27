import {
  AccountIdSplitParams,
  AssetIdParams,
  AssetNameParams,
  AssetTypeParams,
  CAIP,
  ChainIdParams,
  getParams,
  splitParams,
} from "caip-common";

const hederaReferencesRegex = new RegExp("[-a-zA-Z0-9]{5,32}");

const hederaAddressRegex =
  /[0-9]{1,19}\.[0-9]{1,19}\.[0-9]{1,19}(\-[a-z]{5}){0,1}/;

const hederaTokenIdRegex = new RegExp(`[0-9]{1,19}`);

export function isValidHederaChainId(id: string): boolean {
  const { namespace, reference } = getParams<ChainIdParams>(id, CAIP["2"]);

  if (!isValidChainIdHederaNamespaceAndReference(namespace, reference)) {
    return false;
  }

  return true;
}

export function isValidHederaAccountId(id: string): boolean {
  const { namespace, reference, address } = getParams<AccountIdSplitParams>(
    id,
    CAIP["10"]
  );

  if (!isValidChainIdHederaNamespaceAndReference(namespace, reference)) {
    return false;
  }

  if (!isValidHederaAddress(address)) {
    return false;
  }

  return true;
}

export function isValidHederaAssetName(id: string): boolean {
  const { namespace, reference } = getParams<AssetNameParams>(
    id,
    CAIP["19"].assetName
  );

  if (!isValidHederaAssetNamespaceAndReference(namespace, reference)) {
    return false;
  }

  return true;
}

export function isValidHederaAssetType(id: string): boolean {
  const { chainId, assetName } = getParams<AssetTypeParams>(
    id,
    CAIP["19"].assetType
  );

  const chainIdString = chainId.toString();

  const assetNameString = assetName.toString();

  if (!isValidHederaChainId(chainIdString)) {
    return false;
  }

  if (!isValidHederaAssetName(assetNameString)) {
    return false;
  }

  return true;
}

export function isValidHederaAssetId(id: string): boolean {
  const { chainId, assetName, tokenId } = getParams<AssetIdParams>(
    id,
    CAIP["19"].assetId
  );

  const { namespace } = getParams<AssetNameParams>(
    assetName.toString(),
    CAIP["19"].assetName
  );

  // only nft namespace has a tokenId
  if (namespace !== "nft") {
    return false;
  }

  const chainIdString = chainId.toString();

  const assetNameString = assetName.toString();

  if (!isValidHederaChainId(chainIdString)) {
    return false;
  }

  if (!isValidHederaAssetName(assetNameString)) {
    return false;
  }

  if (!isValidHederaTokenId(tokenId)) {
    return false;
  }

  return true;
}

export function isValidHederaTokenId(tokenId: string): boolean {
  if (!hederaTokenIdRegex.test(tokenId)) {
    return false;
  }

  return true;
}

export function isValidHederaAssetNamespaceAndReference(
  namespace: string,
  reference: string
): boolean {
  if (namespace !== "token" && namespace !== "nft") {
    return false;
  }

  // Check if the string matches the hedera reference regex pattern
  if (!hederaAddressRegex.test(reference)) {
    return false;
  }

  return true;
}

export function isValidChainIdHederaNamespaceAndReference(
  namespace: string,
  reference: string
): boolean {
  if (namespace !== "hedera") {
    return false;
  }

  // Check if the string matches the hedera reference regex pattern
  if (!hederaReferencesRegex.test(reference)) {
    return false;
  }
  return true;
}

export function isValidHederaAddress(address: string): boolean {
  return hederaAddressRegex.test(address);
}
