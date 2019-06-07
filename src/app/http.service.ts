import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postDataReg(user: User): Observable<any> {
    const body = {email: user.email, password: user.password};
    return this.http.post<any>('http://localhost:40000/registration', body);
  }

  postDataLog(user: User): Observable<any> {
    const body = {email: user.email, password: user.password};
    return this.http.post<any>('http://localhost:40000/login', body);
  }

  postProducts(product: Product, logedUser?): Observable<any> {
    const body = {name: product.name, description: product.description, status: product.status, price: product.price, userId: logedUser.id};
    return this.http.post<any>('http://localhost:40000/user-page', body);
  }

  getLogedUser(): Observable<any> {
    return this.http.get<any>('http://localhost:40000/logedUser');
  }

  getProducts(): Observable<any> {
    return this.http.get<any>('http://localhost:40000/product-list');
  }

  postUpdate(product: Product, selectedProductId): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const body = {name: product.name, description: product.description, status: product.status, price: product.price};
    body['selectedId'] = selectedProductId;
    return this.http.post<any>('http://localhost:40000/update', body);
  }

  del(product: Product): Observable<any> {
    const body = { id: product.id};
    return this.http.post<any>('http://localhost:40000/product-list', body);
  }


}


