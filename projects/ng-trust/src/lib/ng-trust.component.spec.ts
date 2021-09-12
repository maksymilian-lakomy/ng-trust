import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTrustComponent } from './ng-trust.component';

describe('NgTrustComponent', () => {
  let component: NgTrustComponent;
  let fixture: ComponentFixture<NgTrustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTrustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
