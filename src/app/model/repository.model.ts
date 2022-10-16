import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from './rest.datasource';
// import { StaticDataSource } from './static.datasource';

@Injectable()
export class Model {
  private products: Product[] = new Array<Product>();
  private locator = (p: Product, id: number) => p.id == id;

  constructor (
    private dataSource: RestDataSource
    // private dataSource: StaticDataSource
  ) {
    // this.dataSource.getData().forEach((p) => this.products.push(p))
    dataSource.getData().subscribe(data => this.products = data)
  }

  getProducts (): Product[] {
    return this.products;
  }

  getProduct (id: number): Product {
    return this.products.find(p => this.locator(p, id));
  }

  getNextProductId (id: number): number {
    let index = this.products.findIndex(p => this.locator(p, id));
    if (index > -1) {
      return this.products[this.products.length > index + 1 ? index + 1 : 0].id;
    } else {
      return id || 0;
    }
  }

  getPreviousProductId (id: number): number {
    let index = this.products.findIndex(p => this.locator(p, id));
    if (index > -1) {
      return this.products[index > 0 ? index -1 : this.products.length - 1].id;
    } else {
      return id || 0;
    }
  }

  saveProduct (product: Product): void {
    if(product.id == 0 || product.id == null) {
      this.dataSource.saveProduct(product)
        .subscribe(product => this.products.push(product));
      // product.id = this.generateID();
      // this.products.push(product);
    } else {
      this.dataSource.updateProduct(product)
        .subscribe(product => {
          let index = this.products.findIndex(item => this.locator(item, product.id));
          this.products.splice(index, 1, product);
        });
      // let index = this.products.findIndex(p => this.locator(p, product.id));
      // if (index > -1) {
      //   this.products.splice(index, 1, product);
      // }
    }
  }

  deleteProduct (id: number): void {
    this.dataSource.deleteProduct(id)
      .subscribe(() => {
        let index = this.products.findIndex(product => this.locator(product, id));
        if (index > -1) {
          this.products.splice(index, 1);
        }
      });
    // let index = this.products.findIndex(p => this.locator(p, id));
    // if (index > -1) {
    //   this.products.splice(index, 1);
    // }
  }

  // generateID (): number {
  //   let candidate = 100;
  //   while (this.getProduct(candidate) != null) {
  //     candidate++;
  //   }
  //   return candidate;
  // }

}
