import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regster } from './regster';

describe('Regster', () => {
  let component: Regster;
  let fixture: ComponentFixture<Regster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
