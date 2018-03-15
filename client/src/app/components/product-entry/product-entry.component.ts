import { Component, OnInit } from '@angular/core';
import { ProductInfoService } from '../../services/product-info.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {
  new_product: Product = new Product;
  edit_product = {product_price: null, product_gst: null};
  product_list: Product[];
  reg_exp_gst: RegExp = /^100(\.0{0,2}?)?$|^\d{0,2}(\.\d{0,2})?$/;
  edit_mode: boolean = true;

  constructor(private product_service: ProductInfoService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  //Adds a new product with unique "name" and "code" on button click of Add New Product
  addProduct(){
    this.product_service.getProductByCode(this.new_product.product_code).subscribe(data => {
      if(Object.keys(data).length === 0){
        this.product_service.getProductByName(this.new_product.product_name).subscribe(data2 => {
          if(Object.keys(data2).length === 0){
            this.product_service.addProduct(this.new_product).subscribe(data => {
              this.getAllProducts();
              delete this.new_product;
              this.new_product = new Product;
              });
          } else {
            alert("Product with same NAME already is already present!")
          }
        })
      } else {
        alert("Product with same CODE already is already present!")
      }
    });
  }

  //Saving the new edited details
  saveProduct(product_code){
      console.log(this.edit_product);
      this.product_service.editProduct(this.edit_product, product_code).subscribe(data => {
      this.getAllProducts();
      this.edit_product = {product_price: null, product_gst: null};
      this.edit_mode = true;
      let price_textbox = <HTMLInputElement> document.getElementById("Price_"+product_code);
      let gst_textbox = <HTMLInputElement> document.getElementById("GST_"+product_code);
      price_textbox.disabled = true;
      gst_textbox.disabled = true;
    });
  }

  //Turning edit mode on for a particular product
  editMode(product_code){
    let price_textbox = <HTMLInputElement> document.getElementById("Price_"+product_code);
    let gst_textbox = <HTMLInputElement> document.getElementById("GST_"+product_code);
    price_textbox.disabled = false;
    gst_textbox.disabled = false;
    this.edit_mode = false;
    this.product_service.getProductByCode(product_code).subscribe(data => {
      this.edit_product.product_gst = data[0].product_gst;
      this.edit_product.product_price = data[0].product_code;
    });
  }

  //Gets all the product
  getAllProducts(){
    this.product_service.getAllProducts().subscribe(data => {
      this.product_list = data;
    });
  }
}
