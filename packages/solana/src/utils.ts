import {
  AccountIdSplitParams,
  AssetTypeParams,
  IdentifierSpec,
  getParams,
  isValidId,
  splitParams,
} from "caip-common";

// Define the base58btc pattern
const base58BTCChars =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const base58BTCPattern = new RegExp(`^[${base58BTCChars}]+$`);

const solanaAddressRegex = new RegExp("[1-9A-HJ-NP-Za-km-z]{32,44}");

export function isValidSolanaChainId(
  id: string,
  spec: IdentifierSpec
): boolean {
  if (!isValidId(id, spec)) {
    return false;
  }

  const params = splitParams(id, spec);

  if (!isValidSolanaChainIdNamespaceAndReference(params[0], params[1])) {
    return false;
  }

  return true;
}

export function isValidSolanaAccountId(
  id: string,
  spec: IdentifierSpec
): boolean {
  if (!isValidId(id, spec)) {
    return false;
  }

  const { namespace, reference, address } = getParams<AccountIdSplitParams>(
    id,
    this.spec
  );

  if (!isValidSolanaChainIdNamespaceAndReference(namespace, reference)) {
    return false;
  }

  if (!isValidSolanaAddress(address)) {
    return false;
  }

  return true;
}

export function isValidSolanaAssetName(
  id: string,
  spec: IdentifierSpec
): boolean {
  if (!isValidId(id, spec)) {
    return false;
  }

  const params = splitParams(id, spec);

  if (!isValidSolanaAssetNameAndReference(params[0], params[1])) {
    return false;
  }

  return true;
}

export function isValidSolanaAssetType(
  id: string,
  spec: IdentifierSpec
): boolean {
  if (!isValidId(id, spec)) {
    return false;
  }

  const { chainId, assetName } = getParams<AssetTypeParams>(id, spec);

  const chainIdString = chainId.toString();
  const assetNameString = assetName.toString();

  if (!isValidSolanaChainId(chainIdString, spec)) {
    return false;
  }

  if (!isValidSolanaAssetName(assetNameString, spec)) {
    return false;
  }
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
