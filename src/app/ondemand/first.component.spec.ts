import { Component, DebugElement, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { FirstComponent } from './first.component';

@Component({
  template: `<first [pa-model]="model"></first>`
})
class TestComponent {

  constructor (
    public model: Model
  ) { }

  @ViewChild(FirstComponent)
  firstComponent: FirstComponent;

}

describe('FirstComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: FirstComponent;
  let debugElement: DebugElement;
  let spanElement: HTMLSpanElement;
  let divElement: HTMLDivElement;

  let mockRepository = {
    getProducts: function () {
      return [
        new Product(1, 'test1', 'Piłka nożna', 100),
        new Product(2, 'test2', 'Szachy', 100),
        new Product(3, 'test3', 'Piłka nożna', 100)
      ]
    }
  }

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [FirstComponent, TestComponent],
      providers: [
        { provide: Model, useValue: mockRepository }
      ]
    });
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      component = fixture.componentInstance.firstComponent;
      debugElement = fixture.debugElement.query(By.directive(FirstComponent));
      spanElement = debugElement.query(By.css('span')).nativeElement;
      divElement = debugElement.children[0].nativeElement;
    });
  });

  it('Otrzymanie modelu za pomocą właściwości danych wejściowych', () => {
    component.category = 'Szachy';
    fixture.detectChanges();
    let products = mockRepository.getProducts()
      .filter(product => product.category == component.category);
    let componentProducts = component.getProducts();
    for (let i = 0; i < componentProducts.length; i++) {
      expect(componentProducts[i]).toEqual(products[i]);
    }
    expect(debugElement.query(By.css('span')).nativeElement.textContent).toContain(products.length);
  });

  it('Implementacja właściwości danych wyjściowych', () => {
    let highlighted: boolean;
    component.change.subscribe(value => highlighted = value);
    debugElement.triggerEventHandler('mouseenter', new Event('mouseenter'));
    expect(highlighted).toBeTruthy();
    debugElement.triggerEventHandler('mouseleave', new Event('mouseleave'));
    expect(highlighted).toBeFalsy();
  });

  it('Obsługa zdarzeń myszy', () => {
    expect(component.highlighted).toBeFalsy();
    expect(divElement.classList.contains('bg-success')).toBeFalsy();
    debugElement.triggerEventHandler('mouseenter', new Event('mouseenter'));
    fixture.detectChanges();
    expect(component.highlighted).toBeTruthy();
    expect(divElement.classList.contains('bg-success')).toBeTruthy();
    debugElement.triggerEventHandler('mouseleave', new Event('mouseleave'));
    fixture.detectChanges();
    expect(component.highlighted).toBeFalsy();
    expect(divElement.classList.contains('bg-success')).toBeFalsy();
  });

  it('Filtrowanie kategorii', () => {
    component.category = 'Szachy'
    fixture.detectChanges();
    expect(component.getProducts().length).toBe(1);
    expect(spanElement.textContent).toContain('1');

    component.category = 'Piłka nożna'
    fixture.detectChanges();
    expect(component.getProducts().length).toBe(2);
    expect(spanElement.textContent).toContain('2');

    component.category = 'Bieganie'
    fixture.detectChanges();
    expect(component.getProducts().length).toBe(0);
    expect(spanElement.textContent).toContain('0');
  });
});
