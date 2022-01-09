import {useEffect, useState} from "react";
import {GenerateECDH} from "../../../components/crypto/generate";
import {ExportPrivateJWK} from "../../../components/crypto/export";
import {ImportPrivateJWK, ImportPublicJWK} from "../../../components/crypto/import";
import {DeriveDHKey} from "../../../components/crypto/derive";
import {EncryptDataByAES} from "../../../components/crypto/encrypt";
import {ab2str, str2ab} from "../../../components/crypto/conversion";

function stringToUint8Array(str: string){
  let arr = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }

  let tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array
}
const SendDH = () => {

  const [token, setToken] = useState("")
  const [deviceID, setDeviceID] = useState("")
  const [iv, setIV] = useState("")
  const [jwk, setJwk] = useState("")

  const handleSendDHData = async () => {
    const k = await GenerateECDH()
    const privateKeyJwk = await ExportPrivateJWK(k.privateKey)
    const publicKeyJwk = await ExportPrivateJWK(k.publicKey)
    const privateKey = await ImportPrivateJWK(privateKeyJwk)

    const remotePublicKey = await ImportPublicJWK(JSON.parse(jwk))
    const derive = await DeriveDHKey(remotePublicKey, privateKey)

    const enc = new TextEncoder().encode(JSON.stringify(privateKeyJwk))

    const e = await EncryptDataByAES(derive, enc, stringToUint8Array(iv))
    const encData = window.btoa(ab2str(e))
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("device_id", deviceID);
    formdata.append("public_jwk", JSON.stringify(publicKeyJwk));
    formdata.append("private_jwk", encData);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    // @ts-ignore
    fetch("http://localhost:8088/api/v1/account/rsa/private/send", requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        window.close()
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    const deviceHash = localStorage.getItem("hvxahv_device_hash")
    const t = localStorage.getItem("hvxahv_login_token")
    if (t == undefined || deviceHash == undefined) {
      return
    }
    setToken(t)

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${t}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // @ts-ignore
    fetch(`http://localhost:8088/api/v1/account/rsa/public/${deviceHash}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setDeviceID(res.device_id)
        setIV(res.iv)
        setJwk(res.jwk)
      })
      .catch(error => console.log('error', error));
  }, [])

  return (
    <>
      <button onClick={() => handleSendDHData()}>Send Public Key</button>
    </>
  )
}

export default SendDH