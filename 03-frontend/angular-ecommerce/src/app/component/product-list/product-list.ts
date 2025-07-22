import { Component, OnInit } from '@angular/core';
import { Productservice } from '../../services/productservice';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = true;

  constructor(
    private productservice: Productservice,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
 

    if (this.searchMode) {

      this.handleSearchProducts();

    } else {
      this.handleListProducts();
    }

  }
  handleSearchProducts() {
    const theKeyword = this.route.snapshot.paramMap.get('keyword')!;
    this.productservice.searchProduct(theKeyword).subscribe(
      data=>{
        console.log("Search result:", data);
        this.products = data;
      }
    )
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {

      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

    }
    else {
      this.currentCategoryId = 1;
    }

    this.productservice.getProductList(this.currentCategoryId).subscribe(
      data => { this.products = data }
    )


  }


}
