import {Id} from './common.model';

export class DishesPhotoModel implements Id {
  public id?: string;
  public dishesId: string;
  public img: string;
  public imgName: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.dishesId = model.dishesId;
    this.img = model.img;
    this.imgName = model.imgName;
  }
}
