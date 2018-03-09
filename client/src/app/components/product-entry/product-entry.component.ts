import { Component, OnInit } from '@angular/core';
import { ProductInfoService } from '../../services/product-info.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.css']
})
export class ProductEntryComponent implements OnInit {
  product_list: Product[];
  constructor(private product_service: ProductInfoService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.product_service.getAllProducts().subscribe(data => {
      this.product_list = data;
    });
  }
}
