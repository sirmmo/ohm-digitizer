import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextmetaComponent } from './textmeta.component';

describe('TextmetaComponent', () => {
  let component: TextmetaComponent;
  let fixture: ComponentFixture<TextmetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextmetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
