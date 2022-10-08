import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState } from './sharedState.model';

@Component({
  selector: 'paTable',
  templateUrl: 'table.component.html'
})
export class TableComponent {

  constructor(
    private model: Model,
    private state: SharedState
  ) { }

  getProduct (key: number): Product {
    return this.model.getProduct(key);
  }

  getProducts (): Product[] {
    return this.model.getProducts();
  }

  deleteProduct (key: number): void {
    this.model.deleteProduct(key);
  }

  editProduct (key: number): void {
    this.state.id = key;
    this.state.mode = MODES.EDIT;
  }

  createProduct (): void {
    this.state.id = undefined;
    this.state.mode = MODES.CREATE;
  }

}
