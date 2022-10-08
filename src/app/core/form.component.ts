import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { MODES, SharedState } from "./sharedState.model";

@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class FormComponent {

  product: Product = new Product();

  constructor(
    private model: Model,
    private state: SharedState
  ) { }

  get editing (): boolean {
    return this.state.mode === MODES.EDIT;
  }

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

}
