import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAidsComponent } from './first-aids.component';

describe('FirstAidsComponent', () => {
  let component: FirstAidsComponent;
  let fixture: ComponentFixture<FirstAidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstAidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstAidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
