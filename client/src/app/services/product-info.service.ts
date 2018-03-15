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

  //get all products
  getAllProducts(){
    return this.http.get<Product[]>(this.get_products);
  }

  //get product by name
  getProductByName(product_name){
    return this.http.get<Product>(this.get_product_by_name + product_name);
  }

  //get product by code
  getProductByCode(product_code){
    return this.http.get<Product>(this.get_product_by_code + product_code);
  }

  //add a new product to the database
  addProduct(product: Product){
    const body = JSON.stringify(product)
    return this.http.post<any>(this.post_product, body);
  }

  //edit the existing product in the database
  editProduct(product: any, product_code){
   const body = JSON.stringify(product)
   return this.http.post<any>(this.edit_product+ product_code, body);
  }
}
