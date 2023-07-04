import {
  AccountIdSplitParams,
  AssetNameParams,
  AssetTypeParams,
  CAIP,
  ChainIdParams,
  getParams,
} from "caip-common";

// Define the base58btc pattern
const base58BTCChars =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const base58BTCPattern = new RegExp(`^[${base58BTCChars}]+$`);

const solanaAddressRegex = new RegExp("[1-9A-HJ-NP-Za-km-z]{32,44}");

export function isValidSolanaChainId(id: string): boolean {
  const { namespace, reference } = getParams<ChainIdParams>(id, CAIP["2"]);

  if (!isValidSolanaChainIdNamespaceAndReference(namespace, reference)) {
    return false;
  }

  return true;
}

export function isValidSolanaAccountId(id: string): boolean {
  const { namespace, reference, address } = getParams<AccountIdSplitParams>(
    id,
    CAIP["10"]
  );

  if (!isValidSolanaChainIdNamespaceAndReference(namespace, reference)) {
    return false;
  }

  if (!isValidSolanaAddress(address)) {
    return false;
  }

  return true;
}

export function isValidSolanaAssetName(id: string): boolean {
  const { namespace, reference } = getParams<AssetNameParams>(
    id,
    CAIP["19"].assetName
  );

  if (!isValidSolanaAssetNameAndReference(namespace, reference)) {
    return false;
  }

  return true;
}

export function isValidSolanaAssetType(id: string): boolean {
  const { chainId, assetName } = getParams<AssetTypeParams>(
    id,
    CAIP["19"].assetType
  );

  const chainIdString = chainId.toString();
  const assetNameString = assetName.toString();

  if (!isValidSolanaChainId(chainIdString)) {
    return false;
  }

  if (!isValidSolanaAssetName(assetNameString)) {
    return false;
  }
  return true;
}

export function isValidSolanaAssetNameAndReference(
  namespace: string,
  reference: string
): boolean {
  if (namespace !== "token" && namespace !== "nft") {
    return false;
  }

  if (!isValidSolanaAddress(reference)) {
    return false;
  }

  return true;
}

export function isValidSolanaChainIdNamespaceAndReference(
  namespace: string,
  reference: string
): boolean {
  if (namespace !== "solana") {
    return false;
  }

  // solana reference should only be 32 characters long
  if (reference.length !== 32) {
    return false;
  }

  // Check if the string matches the base58btc pattern
  if (!base58BTCPattern.test(reference)) {
    return false;
  }

  return true;
}

export function isValidSolanaAddress(address: string): boolean {
  return solanaAddressRegex.test(address);
}
