import Head from 'next/head'
import React, {useState} from "react";
import GoBack from "../../components/buttons/back";
import {useRouter} from "next/router";
import {ExportPrivateKey, ExportPublicKey} from "../../components/crypto/export";
import {Get} from "../../components/indexed/rsa";

const Inform = () => {
  const router  = useRouter()

  const [privateKey, setPrivateKey ] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const ex = async () => {
    const name = localStorage.getItem("hvxahv_name")
    if (name == undefined) {
      console.log("NAME_NOT_FIND")
      return
    }

    const account = await Get(name)
    const privateKey = await ExportPrivateKey(account.privateKey)
    const publicKey = await ExportPublicKey(account.publicKey)
    console.log(privateKey)
    console.log(publicKey)
    if (privateKey == undefined || publicKey == undefined) {
      return
    }

    setPrivateKey(privateKey)
    setPublicKey(publicKey)
  }

  return (
    <div>
      <Head>
        <title>Inform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GoBack />
        <h3>Inform</h3>
        <p>The current private key is very important, you should export your key and keep it properly. If you do not export your key, you will not be able to log in again when only one client is offline.</p>
        <button onClick={() => ex()} style={{ marginRight: `.5rem` }}>
          Export
        </button>
        <div>
          <hr/>
          <h2>Private Key</h2>
          <code>{privateKey && privateKey}</code>
          <hr/>
          <h2>Public Key</h2>
          <code>{publicKey && publicKey}</code>
          <hr/>
        </div>
        <div>
          <button onClick={() =>　router.push("/accounts/signin")}>OK! GO TO SIGN IN.</button>
        </div>
      </main>
    </div>
  )
}

export default Inform

