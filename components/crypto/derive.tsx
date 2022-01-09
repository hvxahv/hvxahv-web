// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey

export const DeriveDHKey = async (publicKey: CryptoKey | undefined, privateKey: CryptoKey | undefined) => {
  if (publicKey == undefined || privateKey == undefined) {
    return
  }
  return await window.crypto.subtle.deriveKey(
    { name: "ECDH", public: publicKey },
    privateKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  )
}