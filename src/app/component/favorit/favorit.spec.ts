import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favorit } from './favorit';

describe('Favorit', () => {
  let component: Favorit;
  let fixture: ComponentFixture<Favorit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favorit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Favorit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
