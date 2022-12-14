import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";

@Component({
  selector: 'first',
  templateUrl: './first.component.html'
})
export class FirstComponent {

  category: string = 'Piłka nożna';
  highlighted: boolean = false;

  @Output('pa-highlight')
  change = new EventEmitter<boolean>();

  @Input('pa-model')
  model: Model;

  constructor (
    private repository: Model
  ) { }

  getProducts (): Product[] {
    return this.model == null ? [] : this.repository.getProducts()
      .filter(product => product.category == this.category);
  }

  @HostListener('mouseenter', ['$event.type'])
  @HostListener('mouseleave', ['$event.type'])
  setHighlighted (type: string): void {
    this.highlighted = type == 'mouseenter';
    this.change.emit(this.highlighted);
  }

}
