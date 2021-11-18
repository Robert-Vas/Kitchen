import {Id} from './common.model';

export class OwsModel implements Id {
  public id?: string;
  public minWeight: number;
  public maxWeight: number;
  public cost: number;
  public sort: number;
  public isEnable: boolean;
  public date: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.minWeight = model.minWeight;
    this.maxWeight = model.maxWeight;
    this.cost = model.cost;
    this.sort = model.sort;
    this.isEnable = model.isEnable;
    this.date = model.date;
  }
}
