import {Id} from './common.model';

export class LogModel implements Id {
  public id?: string;
  public userId: string;
  public date: string;
  public device: string;

  public userName?: string;
  public email?: string;


  constructor(model: any = {}) {
    this.id = model.id;
    this.device = model.device;
    this.userId = model.userId;
    this.date = model.date;
    this.userName = model.userName;
    this.email = model.email;
  }
}
