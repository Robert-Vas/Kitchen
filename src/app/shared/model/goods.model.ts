import {Id} from './common.model';

export class GoodsModel implements Id {
  public id?: string;
  public name: string;
  public img: string;
  public sort: number;
  public price: number;
  public subCateId: string;
  public weight: number;
  public shelfLife: number;
  public storageConditions: string;
  public isHot: boolean;
  public isNew: boolean;
  public description: string;
  public date: string;

  public cateName?: string;

  constructor(good: any = {}) {
    this.subCateId = good.subCateId;
    this.id = good.id;
    this.img = good.img;
    this.name = good.name || '';
    this.price = good.price || 0;
    this.weight = good.weight;
    this.shelfLife = good.shelfLife;
    this.storageConditions = good.storageConditions;
    this.sort = good.sort;
    this.isHot = good.isHot;
    this.isNew = good.isNew;
    this.description = good.description;
    this.date = good.date;
    this.cateName = good.cateName;
  }
}
