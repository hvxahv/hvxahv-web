import React from 'react';
import styles from './buttons.module.scss'
import { useRouter } from 'next/router'

const CloseIcon = (props: any) => {
  return (
    <svg height={35} viewBox="0 0 24 24" width={35} {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="rgba(31,89,140, 1)" />
    </svg>
  )
}

const GoClose = () => {
  const router = useRouter()
  return (
    <div
        className={styles.goclose}
        // onClick={() => router.back()}
        >
        <CloseIcon />
    </div>
  )
}
export default GoClose