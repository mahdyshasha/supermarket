import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lading } from './lading';

describe('Lading', () => {
  let component: Lading;
  let fixture: ComponentFixture<Lading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
