import {Id} from './common.model';

export class LocationsModel implements Id {
  public id?: string;
  public name: string;
  public neighborhood: string;
  public address: string;
  public zip: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.neighborhood = model.neighborhood;
    this.address = model.address;
    this.zip = model.zip;
  }
}
