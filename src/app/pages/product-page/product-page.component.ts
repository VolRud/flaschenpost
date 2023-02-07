import { Component, OnInit } from '@angular/core';
import { IArticle, ICompletedArticle, IProduct } from 'src/app/models/product';
import {ProductsService} from '../../services/products.service'

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  constructor(
    public productsService: ProductsService,
  ) {
  }
  loading = false;
  // to do file with constants
  RANGE_MINIMUM = 2; // Minimal price for getProductsMoreExpensiveThan
  currentSortAndFilter = {
    increase: false,
    descending: false,
    priceOverMinRange: false,
  }
  viewMode = {
    listWithDetails: true,
    listOfPhotos: false
  }
  ngOnInit(): void {
    this.loading = true

    this.productsService.getAll().subscribe(() => {
      this.loading = false
    })
  }
  // to do a separate component for sorting and filtering
  sortProductsByPrice(sortType :string) {
    this.productsService.sortProducts(sortType);
    if(sortType === 'increase') {
      this.currentSortAndFilter = {
        ...this.currentSortAndFilter,
        increase: !this.currentSortAndFilter.increase,
        descending: false
      }
    } 
    if(sortType === 'descending') {
      this.currentSortAndFilter = {
        ...this.currentSortAndFilter,
        increase: false,
        descending: !this.currentSortAndFilter.descending
      }
    }
  }

  getProductsMoreExpensiveThan() {
    this.currentSortAndFilter = {
      ...this.currentSortAndFilter,
      priceOverMinRange: !this.currentSortAndFilter.priceOverMinRange
    }
    this.productsService.getProductsMoreExpensiveThan(
      this.currentSortAndFilter.priceOverMinRange
      ? this.RANGE_MINIMUM
      : 0)
  }
  switchViewMode() {
    this.viewMode = {
      listWithDetails: !this.viewMode.listWithDetails,
      listOfPhotos: !this.viewMode.listOfPhotos
    }
  }
}
