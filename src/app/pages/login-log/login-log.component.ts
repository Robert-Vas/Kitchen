import {Component, OnInit} from '@angular/core';
import {LogService, LogModel} from '../../shared';

@Component({
  selector: 'app-login-log',
  templateUrl: './login-log.component.html',
  styleUrls: ['./login-log.component.scss']
})
export class LoginLogComponent implements OnInit {
  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: Array<LogModel>;
  list: Array<LogModel>;
  isLoading = false;

  constructor(private logService: LogService) {

  }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.logService.getLogList1().subscribe(result => {
      this.allList = result;
      this.list = this.allList;
    });
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
    const data = this.allList.filter(d => d.userName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
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
}
