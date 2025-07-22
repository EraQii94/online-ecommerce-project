import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { Productservice } from '../../services/productservice';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-category-menu',
  imports: [RouterLink,CommonModule],
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.css'
})
export class ProductCategoryMenu implements OnInit {

  productcategories: ProductCategory[] = [];

  constructor(private productService: Productservice){}


  ngOnInit() {

    this.listProductCategories();
    
  }


  listProductCategories() {
    console.log("Before API Call");
    this.productService.getProductCategories().subscribe(
      (data) =>{
        console.log('product categories='+JSON.stringify(data));
        this.productcategories=data;
      }
    );
  }


}
