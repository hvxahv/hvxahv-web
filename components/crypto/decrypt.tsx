// https://datatracker.ietf.org/doc/html/rfc3447
// The decrypt() method of the SubtleCrypto interface decrypts some encrypted data.
// It takes as arguments a key to decrypt with, some optional extra parameters,
// and the data to decrypt (also known as "ciphertext").
// It returns a Promise which will be fulfilled with the decrypted data (also known as "plaintext").
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
export const DecryptData = async (privateKey: CryptoKey | undefined, ciphertext: ArrayBuffer) => {
    if (privateKey == undefined) {
      return
    }
    return await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP"
      },
      privateKey,
      ciphertext
    );
  }
  export const textEncoding = (text: string) => {
    const enc = new TextEncoder();
    return enc.encode(text);
  }