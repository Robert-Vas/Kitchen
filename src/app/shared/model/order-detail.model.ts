import {Id} from './common.model';

export class OrderDetailModel implements Id {
  public id?: string;
  public orderId: string;
  public goodId: string;
  public num: number;
  public detailPrice: number;
  public amount: number;
  public dishId: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.orderId = model.orderId;
    this.goodId = model.goodId;
    this.num = model.num;
    this.amount = model.amount;
    this.detailPrice = model.detailPrice;
    this.dishId = model.dishId;
  }
}

