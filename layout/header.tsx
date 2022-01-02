import React, { useEffect, useState } from "react"
import { Logged, NoLogged } from '../components/menu/main';
import Link from "next/link";
import styles from './layout.module.scss'
import {useRouter} from "next/router";
import process from "../next.config";
import { UrlObject } from "url";
import {Delete} from "../components/indexed/rsa";

const Header = () => {
  const router = useRouter()
  const [login, setLogin] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("hvxahv_login_token")
    if (token === null) {
      setLogin(false)
    }
  }, [])

  // @ts-ignore
  const name = process.env.name

  const handleLogout = async () => {
    const name = localStorage.getItem("hvxahv_name")
    if (name == undefined) {
      return
    }
    // Delete("hvturingga").then(r => {
    //   console.log(r)
    // })

    localStorage.removeItem("hvxahv_device_id")
    localStorage.removeItem("hvxahv_login_token")
    localStorage.removeItem("hvxahv_device_vapid_publicKey")
    localStorage.removeItem("hvxahv_name")
    router.reload()
    router.push("/")
  }

  return (
    <div style={{margin: `1rem`}}>
      <div className={styles.header}>
        <h1>{name}</h1>
        {login ?
          <div className={styles.menu}>
            {Logged.map((item: { address: string | UrlObject; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => {
              return <li key={idx}><Link href={item.address}>{item.name}</Link></li>
            })}
              <li style={{ cursor: `pointer` }} onClick={() => handleLogout()}>Logout</li>
            </div>
            :
            <div className={styles.menu}>
              {NoLogged.map((item: any, idx: number)  => {
                  return <li key={idx}><Link href={item.address}>{item.name}</Link></li>
              })}
            </div>
          }
        </div>
    </div>
    )
}

export default Header

