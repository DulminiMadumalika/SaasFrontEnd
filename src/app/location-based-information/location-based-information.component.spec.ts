import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBasedInformationComponent } from './location-based-information.component';

describe('LocationBasedInformationComponent', () => {
  let component: LocationBasedInformationComponent;
  let fixture: ComponentFixture<LocationBasedInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationBasedInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationBasedInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
