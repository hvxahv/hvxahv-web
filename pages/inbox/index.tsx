import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {useRouter} from "next/router";

const Inbox: NextPage = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
          <title>INBOX</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={() => router.push("/accounts/rsa/send")}>Authorized login</button>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
)
}

export default Inbox
