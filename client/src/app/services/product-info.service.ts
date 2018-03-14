import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable()
export class ProductInfoService {

  url: string = "http://localhost:3000/";
  get_products: string = this.url + "products";
  get_product_by_name: string = this.url + "name/";
  get_product_by_code: string = this.url + "code/";
  post_product: string = this.url + "product";
  edit_product: string = this.url + "edit/"

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<Product[]>(this.get_products);
  }
  getProductByName(){
    return this.http.get<Product>(this.get_product_by_name);
  }
  getProductByCode(){
    return this.http.get<Product>(this.get_product_by_code);
  }
}
