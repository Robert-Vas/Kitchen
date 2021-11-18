import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AuthService, LogService} from '../shared/services/firebase-api';
import {LogModel} from '../shared/model';
import {DatePipe} from '@angular/common';
import { UserRole } from '../shared/user-role';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;
  navList = [];
  navListAdmin = [
    {
      title: 'nav.home', icon: 'home', isOpen: true, child:
        [
           // {title: 'nav.initialize', url: '/pages/data-initialize'},
          {title: 'nav.dashboard', url: '/pages/dashboard'},
          {title: 'nav.banner', url: '/pages/banner'},
          {title: 'nav.notice', url: '/pages/notice'},
          {title: 'nav.coupon', url: '/pages/coupon'},
          {title: 'nav.pay', url: '/pages/pays'}
        ]
    },
    {
      title: 'nav.product', icon: 'profile', isOpen: false, child:
        [
          {title: 'nav.meals', url: '/pages/meals'},
          {title: 'nav.dishes', url: '/pages/dishes'},
          {title: 'nav.nutrition_fields', url: '/pages/nutrition-fields'},
          {title: 'nav.dish_types', url: '/pages/dish-types'},
          {title: 'nav.ingredients', url: '/pages/ingredients'},
          {title: 'nav.categories', url: '/pages/categories'},
          {title: 'nav.locations', url: '/pages/locations'},
          {title: 'nav.allergens', url: '/pages/allergens'}
        ]
    },
    {
      title: 'nav.order', icon: 'table', isOpen: false, child:
        [
          {title: 'nav.order', url: '/pages/order'},
          {title: 'Admin Order', url: '/pages/order/admin'},
          {title: 'Scan Orders', url: '/pages/qr-scanner'}
         // {title: 'nav.ows', url: '/pages/ows'},
         // {title: 'nav.express', url: '/pages/delivery'}
        ]
    },
    {
      title: 'nav.users', icon: 'user', isOpen: false, child:
        [
          {title: 'nav.users', url: '/pages/users'},
          {title: 'nav.address', url: '/pages/address'},
          {title: 'nav.favorite', url: '/pages/favorite'},
          {title: 'nav.log', url: '/pages/login-log'}
        ]
    },
    {
      title: 'nav.statistics', icon: 'user', isOpen: false, child:
        [
          {title: 'nav.log-chart', url: '/pages/log-chart'},
          {title: 'nav.order-chart', url: '/pages/order-chart'},
        ]
    }
  ];

  navListCook = [
    {
      title: 'nav.order', icon: 'table', isOpen: false, child:
        [
          { title: 'nav.order', url: '/pages/order' },
          {title: 'Scan Orders', url: '/pages/qr-scanner'}
        ]
    }
  ];

  constructor(private router: Router,
              private datePipe: DatePipe,
              private logService: LogService,
              private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      }
    });
  }

  ngOnInit() {
    if (this.authService.user.role == UserRole.admin) {
      this.navList = this.navListAdmin;
    } else {
      this.navList = this.navListCook;
    }
  }

  addLog() {
    const log = new LogModel();
    log.userId = this.authService.user.uid;
    log.device = this.authService.device;
    log.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.logService.addLog(log);
  }
}
