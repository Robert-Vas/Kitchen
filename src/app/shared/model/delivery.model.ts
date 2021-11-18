import {Id} from './common.model';

export class DeliveryModel implements Id {
  public id?: string;
  public sort: number;
  public name: string;
  public shortName: string;
  public cost: number;
  public isEnable: boolean;
  public date: string;


  constructor(model: any = {}) {
    this.id = model.id;
    this.sort = model.sort;
    this.name = model.name;
    this.shortName = model.shortName;
    this.cost = model.cost;
    this.isEnable = model.isEnable;
    this.date = model.date;
  }
}
