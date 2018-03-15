import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductInfoService } from '../../services/product-info.service';
import { Product } from '../../models/product';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class BillingPageComponent implements OnInit {

  product_list: Product[];
  selected_product: any[] = [];
  search_key: string;
  gross_price = 0.0;
  gross_gst = 0;

  constructor(private product_service: ProductInfoService, private _eref: ElementRef) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.product_service.getAllProducts().subscribe(data => {
      this.product_list = data;
    });
  }

  searchEventHandle(){
    var list_elements;
    list_elements = document.getElementById("myDropdown").children;
    for(let element of list_elements){
      if(element.innerHTML.toUpperCase().indexOf(this.search_key.toUpperCase()) > -1){
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    }
  }

  resetList(){
    this.selected_product = [];
    this.gross_price = 0;
  }

  //Not working
  pressedEnter(){
    console.log("eneter pressed");
  }

  selectElement(product){
    if(this.selected_product.indexOf(product) == -1){
      let p = product;
      p.quantity = null;
      this.selected_product.push(p);
    }
  }

  calculateTotal(){
    for(let item of this.selected_product){
      this.gross_gst += (item.quantity * item.product_price) * (item.product_gst/100)
      this.gross_price += item.quantity * item.product_price + this.gross_gst ;
    }
  }

  appearDropdown(){
    document.getElementById("myDropdown").classList.toggle("show");
  }

  onClick(event) {
    if(!(event.target.classList.contains("dropdown") || event.target.classList.contains("search"))) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          this.search_key = "";
        }
      }
    }
  }
}
