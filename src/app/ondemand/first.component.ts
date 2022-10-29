import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";

@Component({
  selector: 'first',
  template: `<div class="bg-primary text-white p-2">
    Mamy <span class="strong"> {{ getProducts().length }} </span> produktów
  </div>`
})
export class FirstComponent {

  constructor(
    private repository: Model
  ) { }

  category: string = 'Piłka nożna';

  getProducts(): Product[] {
    return this.repository.getProducts()
      .filter(product => product.category == this.category);
  }

}
