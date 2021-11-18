import {Id} from './common.model';

export class GoodPhotoModel implements Id {
  public id?: string;
  public goodId: string;
  public img: string;
  public imgName: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.goodId = model.goodId;
    this.img = model.img;
    this.imgName = model.imgName;
  }
}
