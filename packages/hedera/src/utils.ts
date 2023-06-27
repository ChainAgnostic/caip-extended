import { IdentifierSpec, isValidId, splitParams } from "caip-common";

const hederaReferencesRegex = new RegExp("[-a-zA-Z0-9]{5,32}");

export function isValidHederaChainId(
  id: string,
  spec: IdentifierSpec
): boolean {
  if (!isValidId(id, spec)) {
    throw new Error(`Invalid ${spec.name} provided: ${id}`);
  }

  const params = splitParams(id, spec);

  if (params[0] !== "hedera") {
    return false;
  }

  const reference = params[1];

  // Check if the string matches the hedera reference regex pattern
  if (!hederaReferencesRegex.test(reference)) {
    return false;
  }

  return true;
}
