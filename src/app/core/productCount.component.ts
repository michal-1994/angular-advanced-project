import { ChangeDetectorRef, Component, KeyValueDiffer, KeyValueDiffers } from "@angular/core";
import { Model } from "../model/repository.model";

@Component({
  selector: 'paProductCount',
  template: `<div class="bg-info text-white p-2">Liczba produktów: {{ count }}.</div>`
})
export class ProductCountComponent {

  private differ: KeyValueDiffer<any, any>;
  count: number = 0;

  constructor (
    private model: Model,
    private keyValueDiffers: KeyValueDiffers,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit (): void {
    this.differ = this.keyValueDiffers
      .find(this.model.getProducts())
      .create();
  }

  ngDoCheck (): void {
    if (this.differ.diff(this.model.getProducts())) {
      this.updateCount();
    }
  }

  private updateCount () {
    this.count = this.model.getProducts().length;
  }

}
