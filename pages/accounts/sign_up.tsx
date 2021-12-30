import Head from 'next/head'
import React, {useEffect, useState} from "react";
import GoBack from "../../components/buttons/back";
import {useRouter} from "next/router";
import {GenerateKey} from "../../components/crypto/generate";
import {Create, Get} from "../../components/indexed/rsa";
import {ExportPrivateKey, ExportPublicKey} from "../../components/crypto/export";

const SignUp = () => {
  const { locale } = useRouter()
  const [username, setUsername] = useState("hvturingga")
  const [password, setPassword] = useState("hvxahv123")
  const [mail, setMail] = useState("x@disism.com")
  const [message, setMessage] = useState({})
  const [privateKey, setPrivateKey] = useState("")
  const [publicKey, setPublicKey] = useState("")


  useEffect(() => {
    GenerateKey().then(r => {
      ExportPrivateKey(r.privateKey).then(r => {
        if (r == undefined) {
          return
        }
        setPrivateKey(r)
      })
      ExportPublicKey(r.publicKey).then(r => {
        if (r == undefined) {
          return
        }
        setPublicKey(r)
      })
    })
  }, [])

  const handleRegistered = () => {
    Get(username).then(r => {
      if (r != undefined) {
        setMessage("Username already exists")
        return
      } else {
        Create(username, privateKey, publicKey)
      }
    })

    const data = new FormData();
    data.append("mail", mail)
    data.append("username", username);
    data.append("password", password);
    data.append("publicKey", publicKey)
    const requestOptions: Request = {
      method: 'POST',
      // @ts-ignore
      body: data as FormData,
      redirect: 'follow'
    };

    fetch(`${process.env.address}/accounts/signup`, requestOptions)
      .then(res => res.json())
      .then(res => {
          setMessage(res)
      })
      .catch(err => console.log('error', err));
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

