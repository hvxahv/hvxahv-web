import Head from 'next/head'
import React, {useState, useEffect} from "react";
import GoBack from "../../components/buttons/back";
import {useRouter} from "next/router";
import useGeneratorRSAKey from '../../components/rsa/generation';


const SignUp = () => {
    const { locale } = useRouter()

    const publicKey = useGeneratorRSAKey()

    const [username, setUsername] = useState("hvturingga")
    const [password, setPassword] = useState("hvxahv123")
    const [mail, setMail] = useState("x@disism.com")
    const [message, setMessage] = useState({})

    const handleRegistered = () => {
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

