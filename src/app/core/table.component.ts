import { Component, Inject } from '@angular/core';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState, SHARED_STATE } from './sharedState.model';
import '@angular/common/locales/global/pl';
import { Observer } from 'rxjs';

@Component({
  selector: 'paTable',
  templateUrl: 'table.component.html'
})
export class TableComponent {

  constructor(
    private model: Model,
    @Inject(SHARED_STATE) public observer: Observer<SharedState>
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
    this.observer.next(new SharedState(MODES.EDIT, key));
    // this.state.id = key;
    // this.state.mode = MODES.EDIT;
  }

  createProduct (): void {
    this.observer.next(new SharedState(MODES.CREATE));
    // this.state.id = undefined;
    // this.state.mode = MODES.CREATE;
  }

}
