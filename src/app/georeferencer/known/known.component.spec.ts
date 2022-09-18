import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownComponent } from './known.component';

describe('KnownComponent', () => {
  let component: KnownComponent;
  let fixture: ComponentFixture<KnownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
