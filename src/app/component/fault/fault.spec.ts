import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fault } from './fault';

describe('Fault', () => {
  let component: Fault;
  let fixture: ComponentFixture<Fault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fault]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fault);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
