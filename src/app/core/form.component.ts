import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";

@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class FormComponent {

  product: Product = new Product();
  editing: boolean = false;
  // lastId: number;

  constructor(
    private model: Model,
    @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>
  ) {
    stateEvents.subscribe(update => {
      this.product = new Product();
      if (update.id != undefined) {
        Object.assign(this.product, this.model.getProduct(update.id));
      }
      this.editing = update.mode == MODES.EDIT;
    })
  }

  // get editing (): boolean {
  //   return this.state.mode === MODES.EDIT;
  // }

  submitForm (form: NgForm): void {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.product = new Product();
      form.reset();
    }
  }

  resetForm (): void {
    this.product = new Product();
  }

  // ngDoCheck (): void {
  //   if (this.lastId != this.state.id) {
  //     this.product = new Product();
  //     if (this.state.mode == MODES.EDIT) {
  //       Object.assign(this.product, this.model.getProduct(this.state.id));
  //     }
  //     this.lastId = this.state.id;
  //   }
  // }

}
