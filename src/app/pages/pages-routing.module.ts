import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from '../shared';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
      { path: 'banner', loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule), canActivate: [AuthGuard]},
      { path: 'notice', loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule), canActivate: [AuthGuard]},
      { path: 'cate', loadChildren: () => import('./cate/cate.module').then(m => m.CateModule), canActivate: [AuthGuard]},
      { path: 'sub-cate', loadChildren: () => import('./sub-cate/sub-cate.module').then(m => m.SubCateModule), canActivate: [AuthGuard]},
      { path: 'cate-relation', loadChildren: () => import('./cate-relation/cate-relation.module').then(m => m.CateRelationModule), canActivate: [AuthGuard]},
      { path: 'coupon', loadChildren: () => import('./coupon/coupon.module').then(m => m.CouponModule), canActivate: [AuthGuard]},
      { path: 'pays', loadChildren: () => import('./pays/pays.module').then(m => m.PaysModule), canActivate: [AuthGuard]},
      { path: 'good', loadChildren: () => import('./good/good.module').then(m => m.GoodModule), canActivate: [AuthGuard]},
      { path: 'dishes', loadChildren: () => import('./dishes/dishes.module').then(m => m.DishesModule), canActivate: [AuthGuard]},
      { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule), canActivate: [AuthGuard]},
      { path: 'dish-types', loadChildren: () => import('./dish_types/dish_types.module').then(m => m.DishTypesModule), canActivate: [AuthGuard]},
      { path: 'ingredients', loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule), canActivate: [AuthGuard]},
      { path: 'allergens', loadChildren: () => import('./allergens/allergens.module').then(m => m.AllergensModule), canActivate: [AuthGuard]},
      // tslint:disable-next-line: max-line-length
      { path: 'nutrition-fields', loadChildren: () => import('./nutrition_fields/nutrition_fields.module').then(m => m.NutritionFieldsModule), canActivate: [AuthGuard]},
      { path: 'locations', loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule), canActivate: [AuthGuard]},
      { path: 'meals', loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule), canActivate: [AuthGuard]},
      { path: 'ows', loadChildren: () => import('./ows/ows.module').then(m => m.OwsModule), canActivate: [AuthGuard]},
      { path: 'delivery', loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule), canActivate: [AuthGuard] },
      { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule), canActivate: [AuthGuard] },
      { path: 'address', loadChildren: () => import('./address/address.module').then(m => m.AddressModule), canActivate: [AuthGuard]},
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard]},
      { path: 'favorite', loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoriteModule), canActivate: [AuthGuard]},
      {path: 'login-log', loadChildren: () => import('./login-log/login-log.module').then(m => m.LoginLogModule)},
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
      { path: 'data-initialize', loadChildren: () => import('./data-initialize/data-initialize.module').then(m => m.DataInitializeModule), canActivate: [AuthGuard]},
      { path: 'log-chart', loadChildren: () => import('./log-chart/log-chart.module').then(m => m.LogChartModule), canActivate: [AuthGuard]},
      { path: 'order-chart', loadChildren: () => import('./order-chart/order-chart.module').then(m => m.OrderChartModule), canActivate: [AuthGuard]},
      { path: 'qr-scanner', component: QrScannerComponent, canActivate: [AuthGuard]},
      {path: 'not-found', component: NotFoundComponent},
      {path: '**', redirectTo: 'not-found'}
    ],
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
