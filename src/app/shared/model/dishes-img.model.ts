import {Id} from './common.model';

export class DishesImgModel implements Id {
  public id?: string;
  public dishesId: string;
  public img: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.dishesId = model.dishesId;
    this.img = model.img;
  }

}
