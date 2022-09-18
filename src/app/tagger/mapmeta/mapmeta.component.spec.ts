import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapmetaComponent } from './mapmeta.component';

describe('MapmetaComponent', () => {
  let component: MapmetaComponent;
  let fixture: ComponentFixture<MapmetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapmetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
