import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../product.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private productsUrl = 'api/pr/';
  constructor(private http: HttpClient) {}

  getallproducts() {
    return this.http.get<ProductModel[]>(this.productsUrl);
  }

  createproduct(inputdata: ProductModel) {
    return this.http.post(this.productsUrl, inputdata);
  }

  updateproduct(inputdata: ProductModel) {
    return this.http.put(this.productsUrl + inputdata.id, inputdata);
  }

  deleteproduct(productid: number) {
    return this.http.delete(this.productsUrl + productid);
  }

  getproduct(productid: number) {
    return this.http.get<ProductModel>(this.productsUrl + productid);
  }
}
