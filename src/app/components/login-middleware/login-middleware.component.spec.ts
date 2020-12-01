import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMiddlewareComponent } from './login-middleware.component';

describe('LoginMiddlewareComponent', () => {
  let component: LoginMiddlewareComponent;
  let fixture: ComponentFixture<LoginMiddlewareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMiddlewareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMiddlewareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
