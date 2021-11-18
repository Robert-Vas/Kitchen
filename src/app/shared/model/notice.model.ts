import {Id} from './common.model';

export class NoticeModel implements Id {
  public id?: string;
  public name: string;
  public date: string;
  public description: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.description = model.description;
    this.date = model.date;
  }
}
