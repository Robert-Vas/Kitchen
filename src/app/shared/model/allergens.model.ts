import {Id} from './common.model';

export class AllergensModel implements Id {
  public id?: string;
  public name_en: string;
  public name_sp: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name_en = model.name_en;
    this.name_sp = model.name_sp;
  }
}
