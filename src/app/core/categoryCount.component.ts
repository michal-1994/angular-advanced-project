import { ChangeDetectorRef, Component, KeyValueDiffer, KeyValueDiffers } from "@angular/core";
import { Model } from "../model/repository.model";

@Component({
  selector: 'paCategoryCount',
  template: `<div class="bg-info text-white p-2">Liczba kategorii: {{ count }}.</div>`
})
export class CategoryCountComponent {

  private differ: KeyValueDiffer<any, any>;
  count: number = 0;

  constructor(
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
    if (this.differ.diff(this.model.getProducts()) != null) {
      this.count = this.model.getProducts()
        .map((product) => product.category)
        .filter((category, index, array) => array.indexOf(category) == index).length;
    }
  }

}
