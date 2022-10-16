import { ChangeDetectorRef, Component, KeyValueDiffer, KeyValueDiffers } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Model } from "../model/repository.model";

@Component({
  selector: 'paProductCount',
  template: `<div class="bg-info text-white p-2">Liczba produktów: {{ count }}.</div>`
})
export class ProductCountComponent {

  private differ: KeyValueDiffer<any, any>;
  count: number = 0;
  private category: string;

  constructor(
    private model: Model,
    private keyValueDiffers: KeyValueDiffers,
    private changeDetector: ChangeDetectorRef,
    activeRoute: ActivatedRoute
  ) {
    activeRoute.pathFromRoot.forEach(route => route.params.subscribe(params => {
      if (params['category'] != null) {
        this.category = params['category'];
        this.updateCount();
      }
    }));
  }

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
    this.count = this.model.getProducts()
      .filter(product => this.category == null || product.category == this.category).length;
  }

}
