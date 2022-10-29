import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { FirstComponent } from './first.component';

describe('FirstComponent', () => {
  let fixture: ComponentFixture<FirstComponent>;
  let component: FirstComponent;

  let mockRepository = {
    getProducts: function () {
      return [
        new Product(1, 'test1', 'Piłka nożna', 100),
        new Product(2, 'test2', 'Szachy', 100),
        new Product(3, 'test3', 'Piłka nożna', 100)
      ]
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstComponent],
      providers: [
        { provide: Model, useValue: mockRepository }
      ]
    });
    fixture = TestBed.createComponent(FirstComponent);
    component = fixture.componentInstance;
  });

  it('Filtrowanie kategorii', () => {
    component.category = 'Szachy'
    expect(component.getProducts().length).toBe(1);
    component.category = 'Piłka nożna'
    expect(component.getProducts().length).toBe(2);
    component.category = 'Bieganie'
    expect(component.getProducts().length).toBe(0);
  });
});
