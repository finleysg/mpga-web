import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardCardComponent } from './hard-card.component';

describe('HardCardComponent', () => {
  let component: HardCardComponent;
  let fixture: ComponentFixture<HardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
