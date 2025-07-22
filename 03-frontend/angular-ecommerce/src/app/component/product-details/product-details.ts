import { Component, OnInit } from '@angular/core';
import { Productservice } from '../../services/productservice';
import { Product } from '../../common/product';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  public product!: Product

  constructor(private productService: Productservice,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data
      }
    )
  }

}
