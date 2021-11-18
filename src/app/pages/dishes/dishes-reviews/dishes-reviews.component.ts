import {Component, Input, OnInit} from '@angular/core';
import {DishesReviewsModel, UserModel} from '../../../shared/model';
import {DishesReviewsService, UsersService, PageDataService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-dishes-reviews',
  templateUrl: './dishes-reviews.component.html',
  styleUrls: ['./dishes-reviews.component.scss']
})
export class DishesReviewsComponent implements OnInit {
  @Input() id: string;
  list: Array<DishesReviewsModel>;
  userList: Array<UserModel>;

  constructor(private gService: DishesReviewsService,
              private userService: UsersService,
              private pageService: PageDataService,
              private modal: NzModalRef) {
  }

  ngOnInit() {
    this.pageService.getList([this.gService.getListByParam('dishesId', this.id), this.userService.getList()]).then(results => {
      this.list = results[0];
      this.userList = results[1];
      this.list = this.list.map(g => {
        const name = this.userList.find(u => u.uid === g.uid).displayName;
        return new DishesReviewsModel({userName: name, ...g});
      });
    });
  }

  onClose() {
    this.modal.close(true);
  }

}
