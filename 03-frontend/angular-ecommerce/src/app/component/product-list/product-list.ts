import { Component, OnInit } from '@angular/core';
import { Productservice } from '../../services/productservice';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule,NgbModule],
  templateUrl: './product-list-grid.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = true;

  // prop. for pagination
  thePageNumber = 1;
  thePageSize = 10;
  theTotalElements = 0;

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
      data => {
        console.log("Search result:", data);
        this.products = data;
      }
    )
  }

  handleListProducts() {
    //check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');


    if (hasCategoryId) {

      //get the id and convert to a number it using + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

    }
    else {
      //if no category id available set the default to 1
      this.currentCategoryId = 1;
    }
    //if we changed the category id reset the page number to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    //get the products
    this.productservice.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(
        data => {
          this.products = data._embedded.products;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        }
      );


  }




}


