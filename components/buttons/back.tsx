import React from 'react';
import styles from './buttons.module.scss'
import { useRouter } from 'next/router'

const GoBackIcon = (props: any) => {
    return (
        <svg height={35} viewBox="0 0 24 24" width={35} {...props}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="rgba(31,89,140, 1)" />
        </svg>
    )
}

const GoBack = () => {
    const router = useRouter()
    return (
        <>
            <div
                className={styles.goback}
                onClick={() => router.back()}
                >
                <GoBackIcon />
            </div>
        </>
    )
}
export default GoBack
