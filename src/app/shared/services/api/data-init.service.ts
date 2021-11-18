import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataInitService {

  constructor(private http: HttpClient) {
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (!error.ok) {
      errMsg = 'Can\'t connect to server.';
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }


  getBannerList(): Observable<any> {
    return this.http.get('./assets/init-data/banner.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getNoticeList(): Observable<any> {
    return this.http.get('./assets/init-data/notice.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getDiscountList(): Observable<any> {
    return this.http.get('./assets/init-data/discount.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getPayList(): Observable<any> {
    return this.http.get('./assets/init-data/pays.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getExpressList(): Observable<any> {
    return this.http.get('./assets/init-data/express.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getCateList(): Observable<any> {
    return this.http.get('./assets/init-data/cate.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getOrderList(): Observable<any> {
    return this.http.get('./assets/init-data/order.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }


  getProductList(): Observable<any> {
    return this.http.get('./assets/init-data/product.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getSubCateList(): Observable<any> {
    return this.http.get('./assets/init-data/subcate.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getOwsList(): Observable<any> {
    return this.http.get('./assets/init-data/ows.json', {withCredentials: false})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

}
