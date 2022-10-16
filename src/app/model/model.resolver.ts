import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Message } from "../messages/message.model";
import { MessageService } from "../messages/message.service";
import { Product } from "./product.model";
import { Model } from "./repository.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class ModelResolver {

  constructor(
    private model: Model,
    private dataSource: RestDataSource,
    private messages: MessageService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    if (this.model.getProducts().length == 0) {
      this.messages.reportMessage(new Message('Wczytywanie danych...'));
      return this.dataSource.getData();
    }
  }

}
