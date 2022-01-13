import Dexie, { Table } from 'dexie';
import { ExportPrivateKey, ExportPublicKey } from "../crypto/export";
import { ImportPrivateKey, ImportPublicKey } from "../crypto/import";

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

export const SaveRSA = async (account: string, private_pem: CryptoKey | undefined, public_pem: CryptoKey | undefined) => {
  const a = await GetRSA(account)
  if (a.publicKey != undefined || a.privateKey != undefined) {
    return
  }
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

export const getRSA = async (account: string) => {
  return db.rsa.get(account);
}

export const GetRSA = async (account: string) => {
  const a = await db.rsa.get(account)
  const privateKey = await ImportPrivateKey(a?.private_key)
  const publicKey = await ImportPublicKey(a?.public_key)
  return {
    privateKey,
    publicKey
  }
}

export const DeleteRSA = async (account: string) => {
  const a = await db.rsa.get(account)
  if (a?.account == undefined) {
    return
  }
  await db.rsa.delete(a?.account).then(() => {
    return
  }).catch(err => {
    console.log(err)
  })
}

export const isHaveRSA = async (account: string) => {
  const a = await getRSA(account)
  return !(a == undefined)
}

export const saveRSA = async (account: string, private_key: string, public_key: string) => {
  const a = await getRSA(account)
  if (a != undefined) {
    return
  }

  return db.rsa.add({
    account,
    private_key,
    public_key
  })

}
