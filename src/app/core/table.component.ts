import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import '@angular/common/locales/global/pl';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'paTable',
  templateUrl: 'table.component.html'
})
export class TableComponent {

  category: string = null;

  constructor(
    public model: Model,
    activeRoute: ActivatedRoute
  ) {
    activeRoute.params.subscribe(params => {
      this.category = params['category'] || null;
    })
  }

  getProduct (key: number): Product {
    return this.model.getProduct(key);
  }

  getProducts (): Product[] {
    return this.model.getProducts()
      .filter(product => this.category == null || product.category == this.category);
  }

  get categories (): string[] {
    return this.model.getProducts()
      .map(product => product.category)
      .filter((category, index, array) => array.indexOf(category) == index);
  }

  deleteProduct (key: number): void {
    this.model.deleteProduct(key);
  }

}
