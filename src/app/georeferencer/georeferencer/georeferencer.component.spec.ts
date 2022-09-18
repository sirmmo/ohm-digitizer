import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoreferencerComponent } from './georeferencer.component';

describe('GeoreferencerComponent', () => {
  let component: GeoreferencerComponent;
  let fixture: ComponentFixture<GeoreferencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoreferencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoreferencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
