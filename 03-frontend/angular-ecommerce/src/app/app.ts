import { Component } from '@angular/core';
import { Route, RouterLink, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ProductList } from "./component/product-list/product-list";
import { ProductCategoryMenu } from "./component/product-category-menu/product-category-menu";
import { Search } from "./component/search/search";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,
    ProductList, ProductCategoryMenu, Search],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-ecommerce';
}
