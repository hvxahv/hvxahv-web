import Head from 'next/head'
import React, { useState } from "react";
import GoBack from "../../components/buttons/back";
import { useRouter } from "next/router";
import { generateRSA, GenerateRSA } from "../../components/crypto/generate";
import { SaveRSA, GetRSA, saveRSA, getRSA } from "../../components/indexed/rsa";
import { ExportPublicKey } from "../../components/crypto/export";

const SignUp = () => {
  const router = useRouter()
  const [username, setUsername] = useState("hvturingga")
  const [password, setPassword] = useState("hvxahv123")
  const [mail, setMail] = useState("x@disism.com")
  const [message, setMessage] = useState({})

  const handleRegistered = async () => {
    const account = await getRSA(username)

    if (account != undefined) {
      setMessage("USERNAME_ALREADY_EXISTS")
      return
    }

    const rsa = await generateRSA()
    const x = saveRSA(username, rsa.privateKey, rsa.publicKey)

    const data = new FormData();
    data.append("mail", mail)
    data.append("username", username);
    data.append("password", password);
    data.append("publicKey", rsa.publicKey as string)

    const requestOptions: Request = {
      method: 'POST',
      // @ts-ignore
      body: data as FormData,
      redirect: 'follow'
    };

    fetch(`${process.env.address}/account/signup`, requestOptions)
      .then(res => res.json())
      .then(res => {
        setMessage(res)
        localStorage.setItem("hvxahv_name", username)
        router.push("/accounts/rsa/download")
      })
      .catch(err => console.log('error', err))
  }

  console.log(message)
  return (
    <div>
      <Head>
        <title>REGISTERED</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GoBack />
        <h3>REGISTERED</h3>
        <section>
          <label htmlFor="mail">
            Mail
          </label>
          <input type="text" placeholder="mail" name="mail"
            value={mail} onChange={e => setMail(e.target.value)}
          />

          <label htmlFor="username">
            Username
          </label>
          <input type="text" placeholder="username" name="username"
            value={username} onChange={e => setUsername(e.target.value)}
          />

          <label htmlFor="password">
            Password
          </label>
          <input type="password" placeholder="password" name="password"
            value={password} onChange={e => setPassword(e.target.value)}
          />
        </section>

        <button onClick={() => handleRegistered()} style={{ marginRight: `.5rem` }}>
          SignUp
        </button>
      </main>
    </div>
  )
}

export default SignUp

