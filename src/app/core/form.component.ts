import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';

@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class FormComponent {

  product: Product = new Product();
  editing: boolean = false;

  constructor(
    private model: Model,
    activeRoute: ActivatedRoute
  ) {
    this.editing = activeRoute.snapshot.url[1].path == 'edit';
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
