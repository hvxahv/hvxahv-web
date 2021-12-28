import {ab2str, str2ab} from "./ab2str";

// You can use this format to import or export RSA or Elliptic Curve public keys.
// https://datatracker.ietf.org/doc/html/rfc5280#section-4.1
// https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One

export const ExportPublicKey = async (publicKey: CryptoKey | undefined) => {
  if (publicKey == undefined) {
    return
  }

  const k = await window.crypto.subtle.exportKey(
    "spki",
    publicKey
  )
  const b64 = window.btoa(ab2str(k));
  return `-----BEGIN PUBLIC KEY-----\n${b64}\n-----END PUBLIC KEY-----`;
}

export const ImportPublicKey = async (publicPem: string | undefined) => {
  if (publicPem == undefined) {
    return
  }
  // fetch the part of the PEM string between header and footer
  const h = "-----BEGIN PUBLIC KEY-----";
  const f = "-----END PUBLIC KEY-----";
  const c = publicPem.substring(h.length, publicPem.length - f.length);

  // base64 decode the string to get the binary data
  const bd = window.atob(c)

  return window.crypto.subtle.importKey(
    "spki",
    // convert from a binary string to an ArrayBuffer
    str2ab(bd),
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    true,
    ["encrypt"]
  )
}