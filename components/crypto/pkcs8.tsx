import {ab2str, str2ab} from "./ab2str"

// You can use this format to import or export RSA or Elliptic Curve private keys.
// https://datatracker.ietf.org/doc/html/rfc5208
// https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One

export const ExportPrivateKey = async (privateKey: CryptoKey | undefined) => {
  if (privateKey == undefined) {
    return
  }

  const k = await window.crypto.subtle.exportKey(
    "pkcs8",
    privateKey as CryptoKey
  )
  const b64 = window.btoa(ab2str(k))
  return `-----BEGIN PRIVATE KEY-----\n${b64}\n-----END PRIVATE KEY-----`
}

export const ImportPrivateKey = async (privatePem: string | undefined) => {
  if (privatePem == undefined) {
    return
  }
  // fetch the part of the PEM string between header and footer
  const h = "-----BEGIN PRIVATE KEY-----";
  const f = "-----END PRIVATE KEY-----";
  const c = privatePem.substring(h.length, privatePem.length - f.length);

  // base64 decode the string to get the binary data
  const bd = window.atob(c);
  return window.crypto.subtle.importKey(
    "pkcs8",
    str2ab(bd),
    {
      name: "RSA-PSS",
      // Consider using a 4096-bit key for systems that require long-term security
      // @ts-ignore
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign"]
  )
}