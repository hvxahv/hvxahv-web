import Dexie, { Table } from 'dexie';

export interface RSA {
  id?: number;
  public_key: string;
  private_key: string;
}

export class RSA extends Dexie {
  rsa!: Table<RSA>;

  constructor() {
    super('rsa')
    this.version(1).stores({
      rsa: 'id, public_key, private_key'
    });
  }
}

export const db = new RSA();