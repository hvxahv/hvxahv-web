import Dexie, { Table } from 'dexie';
import {ExportPrivateKey, ExportPublicKey} from "../crypto/export";
import {ImportPrivateKey, ImportPublicKey} from "../crypto/import";

export interface RSA {
  account: string;
  private_key: string;
  public_key: string;
}

export class RSAIndexedDB extends Dexie {
  rsa!: Table<RSA>

  constructor() {
    super('rsa')
    this.version(1).stores({
      rsa: 'account, private_key, public_key',
    })
  }
}

const db = new RSAIndexedDB()

export const Create = async (account: string, private_pem: CryptoKey | undefined, public_pem: CryptoKey | undefined) => {

  const private_key = await ExportPrivateKey(private_pem)
  const public_key = await ExportPublicKey(public_pem)
  if (private_key == undefined || public_key == undefined) {
    return
  }

  return db.rsa.add({
    account,
    private_key,
    public_key
  })

}

export const Get = async (account: string) => {
  const a = await  db.rsa.get(account)
  const privateKey = await ImportPrivateKey(a?.private_key)
  const publicKey = await ImportPublicKey(a?.public_key)
  return {
    privateKey,
    publicKey
  }
}

export const Delete = async (account: string) => {
  // const a = await  db.rsa.get(account)
  // console.log(a)
  // const d = await db.rsa.delete(a.)
  // return {
  //   account
  // }
}