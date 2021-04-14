import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPanelComponent } from './login-panel.component';

describe('LoginPanelComponent', () => {
  let component: LoginPanelComponent;
  let fixture: ComponentFixture<LoginPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPanelComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#submitForm() emits an onFormSuccess event', () => {
    component.loginForm.get('email').setValue('test@test.com');
    component.loginForm.get('password').setValue('12345');
    component.loginForm.get('remember').setValue(true);

    spyOn(component.onFormSuccess, 'emit');
    fixture.detectChanges();

    component.submitForm();
    
    expect(component.onFormSuccess.emit).toHaveBeenCalled();
  });

  it('#submitForm() emits an onFormFail event', () => {
    component.loginForm.get('email').setValue('test@test.com');
    component.loginForm.get('password').setValue('1234');
    component.loginForm.get('remember').setValue(true);

    spyOn(component.onFormFail, 'emit');
    fixture.detectChanges();

    component.submitForm();
    
    expect(component.onFormFail.emit).toHaveBeenCalled();
  });

  it('#getFormErrors() returns that the field password is not correct', () => {
    component.loginForm.get('email').setValue('test@test.com');
    component.loginForm.get('password').setValue('');
    component.loginForm.get('remember').setValue(true);
    
    expect(component.getFormErrors(component.loginForm)).toEqual(['password']);
  });
});
