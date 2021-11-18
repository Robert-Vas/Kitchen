export class BarModel {
  public name: string;
  public value: number;

  constructor(model: any = {}) {
    this.name = model.name;
    this.value = model.value;
  }
}

export class LineModel {
  public name: string;
  public series: Array<BarModel>;

  constructor(model: any = {}) {
    this.name = model.name;
    this.series = model.series;
  }
}


export class ChartModel {
  public name: string;
  public sales: number;
  public num: number;

  constructor(model: any = {}) {
    this.name = model.name;
    this.num = model.num;
    this.sales = model.sales;
  }
}

