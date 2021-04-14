import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#login() show a message in console', () => {
    spyOn(console, 'log');
    component.login({
      email: 'email@email.es',
      password: '12345',
      remember: false
    })
    expect(console.log).toHaveBeenCalledTimes(2);
  });

  it('#showLoginError() show a message in console', () => {
    spyOn(console, 'log');
    component.showLoginError("error")
    expect(console.log).toHaveBeenCalledTimes(2);
  });
});
