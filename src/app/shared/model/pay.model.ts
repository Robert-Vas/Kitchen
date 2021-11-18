import {Id} from './common.model';

export class PayModel implements Id {
  public id?: string;
  public name: string;
  public img: string;
  public minAmount: number;
  public maxAmount: number;
  public sort: number;
  public date: string;
  public isEnable: boolean;

  constructor(model: any = {}) {
    this.id = model.id;
    this.img = model.img;
    this.name = model.name;
    this.minAmount = model.minAmount;
    this.maxAmount = model.maxAmount;
    this.sort = model.sort;
    this.date = model.date;
    this.isEnable = model.isEnable;
  }
}
