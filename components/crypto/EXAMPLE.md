# Example

Generate an RSA key.
```
GenerateKey().then(r => {})
```
Export and Import the public key.
```
ExportPublicKey(r.publicKey).then(r => {
  ImportPublicKey(r).then(r => {

  })
})
```
Export and  Import the private key.
```
ExportPrivateKey(r.privateKey).then(r => {
  ImportPrivateKey(r).then(r => {

  })
})
```
Encrypt the text with the public key and Decrypt by private key.
```
const decrypt = (k:  CryptoKey | undefined, res: ArrayBuffer) => {
  DecryptData(k, res).then(rx => {
    let dec = new TextDecoder()
    console.log(dec)
  })
}

EncryptData(r.publicKey, textEncoding("xxxs")).then(res => {
  decrypt(r.privateKey, res)
})
```