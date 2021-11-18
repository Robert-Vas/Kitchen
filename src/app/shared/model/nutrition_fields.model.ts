import {Id} from './common.model';

export class NutritionFieldsModel implements Id {
  public id?: string;
  public name_en: string;
  public name_sp: string;
  public measurement_display: string;
  public measurement_type: string;
  public sort: number;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name_en = model.name_en;
    this.name_sp = model.name_sp;
    this.measurement_display = model.measurement_display;
    this.measurement_type = model.measurement_type;
    this.sort = model.sort;
  }
}
