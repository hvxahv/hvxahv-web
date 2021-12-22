import React, { useEffect, useState } from "react"
// @ts-ignore
import { Logged, NoLogged } from "../components/menu/main";
import Link from "next/link";
import styles from './layout.module.scss'
import {useRouter} from "next/router";
import process from "../next.config";

const Header = () => {

    const {locale, locales, route} = useRouter()
    const otherLocale = locales?.find((cur) => cur !== locale)

    const router = useRouter()
    const [login, setLogin] = useState(true)

    // useEffect(() => {
    //     const token = localStorage.getItem("hvxahv_login_token")
    //     if (token === null) {
    //         setLogin(false)
    //     }
    // }, [])

    const handleLogout = () => {
        localStorage.removeItem("godis_login_token")
        router.reload()
        router.push("/")
    }
    return (
        <div style={{ margin: `1rem`}}>
            <div className={styles.header}>
                {/*<h1>{process.env.name}</h1>*/}
                {/*{login ?*/}
                {/*    <div className={styles.menu}>*/}
                {/*        {Logged.map((item: string, idx: number) => {*/}
                {/*            return <li key={idx}><Link href={item.address}>{item.name}</Link></li>*/}
                {/*        })}*/}
                {/*        <li style={{ cursor: `pointer` }} onClick={() => handleLogout()}>Logout</li>*/}
                {/*    </div>*/}
                {/*    :*/}
                    <div className={styles.menu}>
                        {NoLogged.map((item: any, idx: number)  => {
                            return <li key={idx}><Link href={item.address}>{item.name}</Link></li>
                        })}
                    </div>
                {/*}*/}
                <div>
                    {/*{otherLocale && (*/}
                    {/*    <Link href={route} locale={otherLocale}>*/}
                    {/*        <a>{t('switchLocale', {locale: otherLocale})}</a>*/}
                    {/*    </Link>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    )
}

export default Header

