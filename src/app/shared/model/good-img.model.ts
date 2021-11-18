import {Id} from './common.model';

export class GoodImgModel implements Id {
  public id?: string;
  public goodId: string;
  public img: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.goodId = model.goodid;
    this.img = model.img;
  }

}
