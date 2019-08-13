import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VgisComponent } from './vgis.component';

describe('VgisComponent', () => {
  let component: VgisComponent;
  let fixture: ComponentFixture<VgisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VgisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VgisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
