import { generateKey } from 'openpgp';

// TODO - https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto
// Storing keys
// CryptoKey objects can be stored using the structured clone algorithm,
// meaning that you can store and retrieve them using standard web storage APIs.
// The specification expects that most developers will use the IndexedDB API to store CryptoKey objects.

// https://datatracker.ietf.org/doc/html/rfc3447
// Use the generateKey() method of the SubtleCrypto interface to generate a new RSA key.
// https://github.com/mdn/dom-examples/tree/master/web-crypto

/*
 Convert  an ArrayBuffer into a string
 from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/

export const GenerateRSA = async () => {
  return await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]
  )
}

export const GenerateECDH = async () => {
  return await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );
}


export const generateRSA = async () => {
  const { privateKey, publicKey } = await generateKey({
      type: 'rsa', // Type of the key
      rsaBits: 4096, // RSA key size (defaults to 4096 bits)
      userIDs: [{ name: 'hvturingga', email: 'x@disism.com' }],
  })
  return {privateKey, publicKey}
}