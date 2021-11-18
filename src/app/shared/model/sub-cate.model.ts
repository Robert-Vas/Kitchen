import {Id} from './common.model';

export class SubCateModel implements Id {
  public id?: string;
  public name: string;
  public sort: number;
  public date: string;
  public img: string;

  public checked?: boolean;
  public relationId?: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.img = model.img;
    this.name = model.name;
    this.date = model.date;
    this.img = model.img;
    this.checked = model.checked;
  }
}
