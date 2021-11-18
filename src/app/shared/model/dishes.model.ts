import {Id} from './common.model';

export class DishesModel implements Id {
  public id?: string;
  public category_ids: string[];
  public date: string;
  public desc_en: string;
  public desc_sp: string;
  public dish_type_id: string;
  public img: string;
  public ingredient_ids: string[];
  public allergen_ids: string[];
  public is_vegan: boolean;
  public name_en: string;
  public name_sp: string;
  public nutrition_fields: {};
  public prep_minutes: number;
  public price: number;
  public procedure_en: string;
  public procedure_sp: string;
  public video: string;

  constructor(dishes: any = {}) {
    this.id = dishes.id;
    this.category_ids = dishes.category_ids || [];
    this.date = dishes.date || '';
    this.desc_en = dishes.desc_en || '';
    this.desc_sp = dishes.desc_sp || '';
    this.dish_type_id = dishes.dish_type_id || '';
    this.img = dishes.img || '';
    this.ingredient_ids = dishes.ingredient_ids || [];
    this.allergen_ids = dishes.allergen_ids || [];
    this.is_vegan = dishes.is_vegan || false;
    this.name_en = dishes.name_en || '';
    this.name_sp = dishes.name_sp || '';
    this.nutrition_fields = dishes.nutrition_fields || {};
    this.prep_minutes = dishes.prep_minutes || 0;
    this.price = dishes.price || 0;
    this.procedure_en = dishes.procedure_en || '';
    this.procedure_sp = dishes.procedure_sp || '';
    this.video = dishes.video || '';
  }
}
