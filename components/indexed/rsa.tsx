import Dexie, { Table } from 'dexie';

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

export const Create = async (account:string, private_key:string, public_key:string) => {
  return db.rsa.add({
    account,
    private_key,
    public_key
  })
}

export const Get = async (account: string) => {
  return db.rsa.get(account)
}