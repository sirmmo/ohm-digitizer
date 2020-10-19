import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhmifyComponent } from './ohmify.component';

describe('OhmifyComponent', () => {
  let component: OhmifyComponent;
  let fixture: ComponentFixture<OhmifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhmifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhmifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
