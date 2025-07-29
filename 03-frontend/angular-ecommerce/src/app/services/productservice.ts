import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class Productservice {


  private BaseUrl = 'http://localhost:8080/api/products';
  private categoriesUrl = "http://localhost:8080/api/product-categories";


  constructor(private http: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {


    const searchUrl = `${this.BaseUrl}/search/findByProductCategory_Id?id=${theCategoryId}`;

    return this.getProducts(searchUrl)
  };

  getProduct(productId: number): Observable<Product> {

    const detailsUrl = `${this.BaseUrl}/${productId}`;
    return this.http.get<Product>(detailsUrl);

  }



  getProductCategories(): Observable<ProductCategory[]> {


    return this.http.get<GetResponseProductCategories>(this.categoriesUrl).pipe
      (
        map(response => response._embedded.productCategories) // Extracting the products from the response

      );
  }




  getAllProducts(): Observable<Product[]> {
    return this.http.get<GetResponseProducts>(`${this.BaseUrl}`).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProduct(theKeyword: string): Observable<Product[]> {
    const url = `${this.BaseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(url)
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.http.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)

    );
  }

  getProductListPaginate(thePage: number, thepageSize: number, theCategoryId: number): Observable<GetResponseProducts> {


    const searchUrl = `${this.BaseUrl}/search/findByProductCategory_Id?id=${theCategoryId}`
      + `&page=${thePage}&size=${thepageSize}`

    return this.http.get<GetResponseProducts>(searchUrl);
  };

  searchProductPagination(thePage: number,
                          thepageSize: number,
                          theKeyword: string): Observable<GetResponseProducts> {


    const searchUrl = `${this.BaseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thepageSize}`

    return this.http.get<GetResponseProducts>(searchUrl);
  };
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategories {
  _embedded: {
    productCategories: ProductCategory[];
  }
}