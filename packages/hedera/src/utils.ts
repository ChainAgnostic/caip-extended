import {
  AccountIdSplitParams,
  IdentifierSpec,
  getParams,
  isValidId,
  splitParams,
} from "caip-common";

const hederaReferencesRegex = new RegExp("[-a-zA-Z0-9]{5,32}");
const hederaAddressRegex = new RegExp(
  "[0-9]{1,19}.[0-9]{1,19}.[0-9]{1,19}(-[a-z]{5}){0,1}"
);

export function isValidHederaChainId(
  id: string,
  spec: IdentifierSpec
): boolean {
  if (!isValidId(id, spec)) {
    return false;
  }

  const params = splitParams(id, spec);

  if (!isValidHederaNamespaceAndReference(params[0], params[1])) {
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

  if (!isValidHederaNamespaceAndReference(namespace, reference)) {
    return false;
  }

  if (!isValidHederaAddress(address)) {
    return false;
  }

  return true;
}

export function isValidHederaNamespaceAndReference(
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
