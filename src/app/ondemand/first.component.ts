import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";

@Component({
  selector: 'first',
  templateUrl: './first.component.html'
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
