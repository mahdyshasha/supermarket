import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nav3 } from './nav3';

describe('Nav3', () => {
  let component: Nav3;
  let fixture: ComponentFixture<Nav3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nav3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nav3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
