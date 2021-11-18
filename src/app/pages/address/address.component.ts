import {Component, OnInit} from '@angular/core';
import {AddressService, AddressModel, UserModel, UsersService, PageDataService} from '../../shared';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  allList: Array<AddressModel> = [];
  list: Array<AddressModel>;
  userList: Array<UserModel>;
  userName = '';
  address = '';

  constructor(private addressService: AddressService,
              private usersService: UsersService,
              private pageService: PageDataService) {

  }

  ngOnInit() {
    this.pageService.getList([this.addressService.getList(), this.usersService.getList()]).then(results => {
      this.allList = results[0];
      this.userList = results[1];
      this.allList = this.allList.map(a => {
        const name = this.userList.find(u => u.uid === a.userId).displayName;
        return new AddressModel({userName: name, ...a});
      });
      this.list = this.allList;
    });
  }

  reset(): void {
    this.userName = '';
    this.address = '';
    this.search();
  }

  search(): void {
    this.list = this.allList.filter(d => d.userName.toLowerCase().indexOf(this.userName.toLowerCase()) !== -1 &&
      d.address.toLowerCase().indexOf(this.address.toLowerCase()) !== -1);

  }
}
