import { IdentifierSpec, splitParams } from "caip-common";

const hederaReferencesRegex = new RegExp("[-a-zA-Z0-9]{5,32}");

export function isValidWavesId(id: string, spec: IdentifierSpec): boolean {
  const params = splitParams(id, spec);

  if (params[0] !== "waves") {
    return false;
  }

  const reference = params[1] as string;

  // solana reference should only be 3 characters long
  if (reference.length !== 3) {
    return false;
  }

  // check if integer in the range [-128..127], padded to 3 chars with leading 0s

  // Remove leading zeros from the string
  const trimmedReference = reference.replace(/^0+/, "");

  const referenceNum = Number(trimmedReference);

  if (!Number.isInteger(referenceNum)) {
    return false;
  }

  if (referenceNum < -128 && referenceNum > 127) {
    return false;
  }

  return true;
}
