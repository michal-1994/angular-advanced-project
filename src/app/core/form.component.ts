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
    let id = activeRoute.snapshot.params['id'];
    if (id != null) {
      let name = activeRoute.snapshot.params['name'];
      let category = activeRoute.snapshot.params['category'];
      let price = activeRoute.snapshot.params['price'];

      if (name != null && category != null && price != null) {
        this.product.id = id;
        this.product.name = name;
        this.product.category = category;
        this.product.price = Number.parseFloat(price);
      } else {
        Object.assign(this.product, model.getProduct(id) || new Product());
      }
    }
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
