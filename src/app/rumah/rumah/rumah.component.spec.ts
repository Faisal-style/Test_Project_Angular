import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RumahComponent } from './rumah.component';

describe('RumahComponent', () => {
  let component: RumahComponent;
  let fixture: ComponentFixture<RumahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RumahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RumahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
