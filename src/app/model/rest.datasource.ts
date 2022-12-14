import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Product } from './product.model';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RestDataSource {

  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string
  ) { }

  getData (): Observable<Product[]> {
    // return this.http.jsonp<Product[]>(this.url, 'callback');
    return this.sendRequest<Product[]>('GET', this.url);
  }

  saveProduct (product: Product): Observable<Product> {
    return this.sendRequest<Product>('POST', this.url, product);
  }

  updateProduct (product: Product): Observable<Product> {
    return this.sendRequest<Product>('PUT', `${this.url}/${product.id}`, product);
  }

  deleteProduct (id: number): Observable<Product> {
    return this.sendRequest<Product>('DELETE', `${this.url}/${id}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: Product): Observable<T> {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Key', 'sekret');
    myHeaders = myHeaders.set('Application-Name', ['AdvancedProject', 'BaseProject']);

    return this.http.request<T>(verb, url, {
      body: body,
      headers: myHeaders
    })
    // .pipe(
    //   delay(5000)
    // )
    .pipe(
      catchError((error: Response) =>
        throwError(`Błąd sieci: ${error.statusText} (${error.status})`)
      )
    );
  }

}
