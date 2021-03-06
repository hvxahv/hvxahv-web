import Head from 'next/head'
import React, { useEffect, useState } from "react";
import GoBack from "../../../components/buttons/back";
import { useRouter } from "next/router";
import { ExportPrivateKey, ExportPublicKey } from "../../../components/crypto/export";
import { getRSA } from "../../../components/indexed/rsa";

const Download = () => {
  const router = useRouter()
  const [hvxahvName, setHvxahvName] = useState("")
  useEffect(() => {
    const name = localStorage.getItem("hvxahv_name")
    if (name == undefined) {
      console.log("NAME_NOT_FIND")
      return
    }
    setHvxahvName(name)
  }, [])

  const handleRSAKeyDownload = async () => {
    const k = await getRSA(hvxahvName)
    if (k == undefined) {
      return
    }

    const a = document.createElement('a')
    a.download = "private_key"

    // @ts-ignore
    const blob = new Blob([k.private_key], { type: '' })
    a.href = window.URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <div>
      <Head>
        <title>RSA Download</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GoBack />
        <h3>Backup your private key.</h3>
        <p>The current private key is very important, you should export your key and keep it properly. If you do not export your key, you will not be able to log in again when only one client is offline.</p>
        
        <div>
          <button onClick={() => handleRSAKeyDownload()}>Download PrivateKey</button>
        </div>
        <div>
          <button onClick={() => router.push("/accounts/signin")}>HAS BEEN DOWNLOADED SUCCESSFULLY! GO TO SIGN IN.</button>
        </div>
      </main>
    </div>
  )
}

export default Download
