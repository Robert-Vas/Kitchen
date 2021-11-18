import {Component, OnInit} from '@angular/core';
import {UserModel, UsersService, ModalService} from '../../shared';
import {NzModalService} from 'ng-zorro-antd';
import {UserInfoComponent} from './user-info/user-info.component';
import { UserRole } from 'src/app/shared/user-role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: Array<UserModel> = [];
  list: Array<UserModel>;
  isLoading = false;
  selected = '';
  editRole = false;
  userRoles = UserRole;

  constructor(private userService: UsersService,
              private modalService: ModalService,
              private mService: NzModalService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.userService.getList().subscribe((result: Array<UserModel>) => {
      this.allList = result;
      this.list = this.allList;
    });
  }

  filterByRole() {
    if (this.selected == '') {
      this.list = this.allList;
    }
    else {
      this.list = [];
      for (var i in this.allList) {
        if (typeof this.allList[i].role != 'undefined' && this.allList[i].role.toString() == this.selected) {
          this.list.push(this.allList[i]);
        }
      }
    }
  }

  convertRole(num) {
    if (num == 0) {
      return 'admin';
    }
    else if (num == 1) {
      return 'cook';
    }
    else if (num == 2) {
      return 'customer';
    }
    else if (num == 3) {
      return 'unapproved';
    }
    else if (num == 4) {
      return 'disabled';
    }
    else {
      return 'unknown';
    }
  }

  hasRole(obj) {
    return typeof obj.role != 'undefined';
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sort: { key: string; value: string }) {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
    const data = this.allList.filter(d => d.displayName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    this.list = data.sort((a, b) => {
        return this.sortValue === 'ascend'
          // tslint:disable-next-line:no-non-null-assertion
          ? a[this.sortName!] <= b[this.sortName!] ? -1 : 1
          // tslint:disable-next-line:no-non-null-assertion
          : b[this.sortName!] > a[this.sortName!]
            ? 1
            : -1;
      }
    );
  }

  onView(data) {
    this.mService.create({
      nzTitle: 'User Info',
      nzContent: UserInfoComponent,
      nzComponentParams: {
        data
      }
    });
  }

  updateRole(data) {
    this.userService.update(data);
  }
  
}
