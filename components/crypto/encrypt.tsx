import React, {useEffect, useState} from "react";
import {string} from "prop-types";

const UseEncryptSaved = () => {
  /*
  Convert a string into an ArrayBuffer
  from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  */
  function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  /*
 Fetch the contents of the "message" textbox, and encode it
 in a form we can use for the encrypt operation.
 */
  function getMessageEncoding() {
    const messageBox = document.querySelector("#rsa-oaep-message");
    let enc = new TextEncoder();
    return enc.encode(`xxs`);
  }

  /*
  Import a PEM encoded RSA private key, to use for RSA-PSS signing.
  Takes a string containing the PEM encoded key, and returns a Promise
  that will resolve to a CryptoKey representing the private key.
  */

  const [encryptData, setEncryptData] = useState(new Uint8Array)

  const [importKey, setImportKey] = useState()

  const [key, setKey] = useState("")

  useEffect(() => {
    const publicKey = localStorage.getItem("hvxahv_publicKey")
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    // @ts-ignore
    const pemContents = publicKey.substring(pemHeader.length, publicKey.length - pemFooter.length);
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);

    window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      true,
      ["encrypt"]
    ).then(r => {
      window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        r,
        getMessageEncoding()
      ).then(r => {
        console.log(r)
        setEncryptData(r)
        // console.log(r)
        // let buffer = new Uint8Array(r, 0, 5);
        // console.log(buffer)
        // @ts-ignore
        // setEncryptData(buffer)
      })
    })


  }, [])

  const decryptData = () => {
    const privateKey = localStorage.getItem("hvxahv_private_key")
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    // @ts-ignore
    const pemContents = privateKey.substring(pemHeader.length, privateKey.length - pemFooter.length);
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);
    // https://datatracker.ietf.org/doc/html/rfc5208
    window.crypto.subtle.importKey(
      "pkcs8",
      binaryDer,
      {
        name: "RSA-OAEP",
        // modulusLength: 4096,
        // publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },
      true,
      ["sign"],

    ).then(r => {
      window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP"
        },
        r,
        encryptData
      ).then(r => {
        console.log(r)
      })
    })
  }

  return (
    <div>
      <button onClick={() => decryptData()}>Decrypt</button>
    </div>
  )

}

export default UseEncryptSaved