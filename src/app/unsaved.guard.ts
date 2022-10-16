import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { FormComponent } from "./core/form.component";
import { Message } from "./messages/message.model";
import { MessageService } from "./messages/message.service";

@Injectable()
export class UnsavedGuard {

  constructor(
    private messages: MessageService,
    private router: Router
  ) { }

  canDeactivate(
    component: FormComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (component.editing) {
      if (['name', 'category', 'price'].some(prop => component.product[prop])) {
        let subject = new Subject<boolean>();

        let responses: [string, () => void][] = [
          [
            'Tak', () => {
              subject.next(true);
              subject.complete();
            }
          ],
          [
            'Nie', () => {
              this.router.navigateByUrl(this.router.url);
              subject.next(false);
              subject.complete();
            }
          ]
        ];
        this.messages.reportMessage(
          new Message('Odrzucić zmiany?', true, responses)
        )
        return subject;
      }
    }
    return true;
  }

}
