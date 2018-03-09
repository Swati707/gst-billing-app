import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntryComponent } from './product-entry.component';

describe('ProductEntryComponent', () => {
  let component: ProductEntryComponent;
  let fixture: ComponentFixture<ProductEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
