import {
  AccountIdSplitParams,
  AssetNameParams,
  AssetTypeParams,
  IdentifierSpec,
  getParams,
  isValidId,
  splitParams,
} from "caip-common";
import { AssetIdParams } from "./assetId";

const hederaReferencesRegex = new RegExp("[-a-zA-Z0-9]{5,32}");

const hederaAddressRegex = new RegExp(
  "[0-9]{1,19}.[0-9]{1,19}.[0-9]{1,19}(-[a-z]{5}){0,1}"
);

const hederaTokenRegex = new RegExp(
  `[0-9]{1,19}\.[0-9]{1,19}\.[0-9]{1,19}(\-[a-z]{5}){0,1}`
);

const hederaNFTRegex = new RegExp(
  `[0-9]{1,19}\.[0-9]{1,19}\.[0-9]{1,19}(\-[a-z]{5}){0,1}\/[0-9]{1,19}`
);

export function isValidHederaChainId(
  id: string,
  spec: IdentifierSpec
): boolean {
  if (!isValidId(id, spec)) {
    return false;
  }

  const params = splitParams(id, spec);

  if (!isValidChainIdHederaNamespaceAndReference(params[0], params[1])) {
    return false;
  }

  return true;
}

export function isValidHederaAccountId(
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

  if (!isValidChainIdHederaNamespaceAndReference(namespace, reference)) {
    return false;
  }

  if (!isValidHederaAddress(address)) {
    return false;
  }

  return true;
}

export function isValidHederaAssetName(
  id: string,
  spec: IdentifierSpec
): boolean {
  if (!isValidId(id, spec)) {
    return false;
  }

  const { namespace, reference } = getParams<AssetNameParams>(id, spec);

  if (!isValidHederaAssetNamespaceAndReference(namespace, reference)) {
    return false;
  }

  return true;
}

export function isValidHederaAssetType(
  id: string,
  spec: IdentifierSpec
): boolean {
  if (!isValidId(id, spec)) {
    return false;
  }

  const { chainId, assetName } = getParams<AssetTypeParams>(id, spec);

  const chainIdString = chainId.toString();

  const assetNameString = assetName.toString();

  if (!isValidHederaChainId(chainIdString, spec)) {
    return false;
  }

  if (!isValidHederaAssetName(assetNameString, spec)) {
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
  if (namespace === "token" && !hederaTokenRegex.test(reference)) {
    return false;
  }

  if (namespace === "nft" && !hederaNFTRegex.test(reference)) {
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
