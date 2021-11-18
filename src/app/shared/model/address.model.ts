import {Id} from './common.model';

export class AddressModel implements Id {
  public id?: string;
  public userId: string;
  public phone: string;
  public street: string;
  public address: string;
  public date: string;

  public userName?: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.address = model.address;
    this.phone = model.phone;
    this.userId = model.userId;
    this.street = model.street;
    this.date = model.date;
    this.userName = model.userName;
  }
}
