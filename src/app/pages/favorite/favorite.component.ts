import {Component, OnInit} from '@angular/core';
import {FavoriteModel, FavoriteService} from '../../shared';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  userName = '';
  list: Array<FavoriteModel>;
  gList: Array<FavoriteModel>;

  constructor(private fService: FavoriteService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.fService.getFavoriteList1().subscribe(r => {
      this.gList = r;
      this.list = this.gList;
    });
  }

  reset(): void {
    this.userName = '';
    this.search();
  }


  search(): void {
    this.list = this.gList.filter(d => d.userName.toLowerCase().indexOf(this.userName.toLowerCase()) !== -1);
  }
}
