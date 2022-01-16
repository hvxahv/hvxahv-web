import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import DeleteDevice from "../../components/devices/delete";
import AvatarUploader from "../../components/settings/avatar";

const Settings: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Settings</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>


              <hr/>
              <h2>Management Devices</h2>
              <AvatarUploader />
              <DeleteDevice />
            </main>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}

export default Settings
