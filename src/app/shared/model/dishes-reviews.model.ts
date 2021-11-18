import {Id} from './common.model';

export class DishesReviewsModel implements Id {
  public id?: string;
  public dishesId: string;
  public uid: string;
  public description: string;
  public date: string;

  public userName?: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.uid = model.uid;
    this.description = model.description;
    this.date = model.date;
    this.dishesId = model.dishesId;
  }
}
