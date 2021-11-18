import {Id} from './common.model';

export class FavoriteModel implements Id {
  public id?: string;
  public userId: string;
  public goodId: string;
  public date: string;

  public userName?: string;

  public constructor(model: any = {}) {
    this.goodId = model.goodId;
    this.userId = model.userId;
    this.date = model.date;
    this.userName = model.userName;
  }
}
