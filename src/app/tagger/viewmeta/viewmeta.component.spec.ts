import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmetaComponent } from './viewmeta.component';

describe('ViewmetaComponent', () => {
  let component: ViewmetaComponent;
  let fixture: ComponentFixture<ViewmetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
