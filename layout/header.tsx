import React, { useEffect, useState } from "react"
import { Logged, NoLogged } from '../components/menu/main';
import Link from "next/link";
import styles from './layout.module.scss'
import { useRouter } from "next/router";
import process from "../next.config";
import { UrlObject } from "url";
import { DeleteRSA, isHaveRSA } from "../components/indexed/rsa";

const Header = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [hvxahv_name, setHvxahvName] = useState("")
  const getKey = async (name: string) => {
    const k = await isHaveRSA(name)
    if (!k) {
      setIsLogin(false)
      return
    }
  }
  useEffect(() => {
    const name = localStorage.getItem("hvxahv_name")
    const token = localStorage.getItem("hvxahv_login_token")
    if (name == null || token == null) {
      setIsLogin(false)
      return
    }
    getKey(name).then(() => {
      setHvxahvName(name)
    })
  }, [])

  // @ts-ignore
  const home_name = process.env.name

  const handleLogout = async () => {
    await DeleteRSA(hvxahv_name)
    localStorage.removeItem("hvxahv_device_id")
    localStorage.removeItem("hvxahv_login_token")
    localStorage.removeItem("hvxahv_device_vapid_publicKey")
    localStorage.removeItem("hvxahv_name")
    router.reload()
    await router.push("/")
  }

  return (
    <div style={{ margin: `1rem` }}>
      <div className={styles.header}>
        <h1>{home_name}</h1>
        {isLogin ?
          <div className={styles.menu}>
            {Logged.map((item: { address: string | UrlObject; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => {
              return <li key={idx}><Link href={item.address}>{item.name}</Link></li>
            })}
            <li style={{ cursor: `pointer` }} onClick={() => handleLogout()}>Logout</li>
          </div>
          :
          <div className={styles.menu}>
            {NoLogged.map((item: any, idx: number) => {
              return <li key={idx}><Link href={item.address}>{item.name}</Link></li>
            })}
          </div>
        }
      </div>
      <button onClick={() => getKey("hvturingga")}>GET</button>
    </div>
  )
}

export default Header
