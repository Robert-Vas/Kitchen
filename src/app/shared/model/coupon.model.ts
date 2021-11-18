import {Id} from './common.model';

export class CouponModel implements Id {
  public id?: string;
  public name: string;
  public beginDate: string;
  public endDate: string;
  public desc: string;
  public date: string;
  public sort: number;
  public amount: number;
  public enable: boolean;
  public discountAmount: number;

  constructor(model: any = {}) {
    this.id = model.id;
    this.beginDate = model.beginDate;
    this.endDate = model.endDate;
    this.desc = model.desc;
    this.name = model.name;
    this.sort = model.sort;
    this.amount = model.amount;
    this.date = model.date;
    this.enable = model.enable;
    this.discountAmount = model.discountAmount;
  }
}
