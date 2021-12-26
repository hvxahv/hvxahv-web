import Head from 'next/head'
import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import styles from './accounts.module.scss'
import GoBack from "../../components/buttons/back";
import process from "../../next.config";

const Signin = () => {
    const { locale } = useRouter()

    const router = useRouter()
    const [username, setUsername] = useState("hvturingga")
    const [password, setPassword] = useState("hvxahv123")
    const [message, setMessage] = useState({})

    const handleLogin = () => {
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);

        const requestOptions: RequestInit = {
            method: 'POST',
            body: data,
            redirect: 'follow'
        };

        // @ts-ignore
        fetch(`${process.env.address}/accounts/signin`, requestOptions)
            .then(res => res.json())
            .then(res => {
                setMessage(res)
                localStorage.setItem("hvxahv_login_token", res.token)
                localStorage.setItem("hvxahv_device_id", res.deviceID)
                localStorage.setItem("hvxahv_device_vapid_publicKey", res.publicKey)
                // router.reload()
            })
            .catch(err => console.log('error', err));
    }

    // useEffect(() => {
    //     const token = localStorage.getItem("hvxahv_token")
    //     if (token !== null) {
    //         router.push("/iam")
    //     }
    // }, [])

    console.log(message)
    return (
        <div>
            <Head>
                <title>LOGIN</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <GoBack />
                <h3>SignIn</h3>
                <section className={styles.login}>
                    <label htmlFor="username">
                      username
                    </label>
                    <input type="text" name="username"
                           value={username} onChange={e => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">
                        password
                    </label>
                    <input type="password" placeholder="password" name="password"
                           value={password} onChange={e => setPassword(e.target.value)}
                    />
                </section>
                <button onClick={() => handleLogin()} style={{ marginRight: `.5rem` }}>
                   submit
                </button>
                <button onClick={() => router.push("/accounts/registered")}>
                    SignUp
                </button>
            </main>
        </div>
    )
}

export default Signin