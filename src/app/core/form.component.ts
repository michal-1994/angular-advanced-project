import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    public model: Model,
    activeRoute: ActivatedRoute,
    private router: Router
  ) {
    activeRoute.params.subscribe(params => {
      this.editing = params['mode'] == 'edit';
      let id = params['id'];
      if (id != null) {
        Object.assign(this.product, model.getProduct(id) || new Product());
      }
    });
  }

  submitForm (form: NgForm): void {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.router.navigateByUrl('/');
    }
  }

  resetForm (): void {
    this.product = new Product();
  }

}
