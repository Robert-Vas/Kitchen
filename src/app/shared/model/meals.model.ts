import {Id} from './common.model';

export class MealsModel implements Id {
  public id?: string;
  public description_en: string;
  public description_sp: string;
  public dates_available: string[];
  public dish_ids: string[];
  public location_ids: string[];

  constructor(model: any = {}) {
    this.id = model.id;
    this.description_en = model.description_en;
    this.description_sp = model.description_sp;
    this.dates_available = model.dates_available;
    this.dish_ids = model.dish_ids;
    this.location_ids = model.location_ids;
  }
}
