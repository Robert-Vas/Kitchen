import {Id} from './common.model';

export class BannerModel implements Id {
  public id?: string;
  public name: string;
  public img: string;
  public date: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.img = model.img;
    this.date = model.date;
  }

}
