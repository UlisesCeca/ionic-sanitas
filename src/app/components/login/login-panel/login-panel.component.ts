import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginStatus } from 'src/app/models/login-status';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPanelComponent implements OnInit {
  @Output()
  public readonly onFormSuccess: EventEmitter<User>;
  @Output()
  public readonly onFormFail: EventEmitter<string>;
  public readonly loginForm: FormGroup;
  private readonly REGEX_ENAIL: RegExp;
  public loginStatus: LoginStatus;

  constructor(
    private readonly formBuilder: FormBuilder
    ) { 
      this.onFormSuccess =  new EventEmitter<User>();
      this.onFormFail = new EventEmitter<string>()
      this.REGEX_ENAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.loginForm = this.formBuilder.group({
        email: this.formBuilder.control(undefined, [Validators.required, Validators.pattern(this.REGEX_ENAIL)]),
        password: this.formBuilder.control(undefined, [Validators.required, Validators.minLength(5)]),
        remember: this.formBuilder.control(false)
      });
    }

  ngOnInit(): void {
  }

  /**
   * Método que comprueba si el formulario de login es correcto.
   * Si lo es, emite el evento onFormSuccess con el usuario proporcionado
   * en el formulario. Si no es correcto, emite el evento onFormFail con un
   * mensaje de error.
   */
  public submitForm(): void {
    let user: User;
    let invalidControls: Array<string>;
    
    this.loginStatus = { show: true };

    if (this.loginForm.valid) {
      this.loginStatus.message = 'Formulario correcto';
      user = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
        remember: this.loginForm.get('remember').value
      }
      this.onFormSuccess.emit(user);
    } else {
      invalidControls = this.getFormErrors(this.loginForm);
      this.loginStatus.message = 'Formulario incorrecto. Campos mal informados: ' + invalidControls;
      this.onFormFail.emit('Formulario incorrecto. Campos mal informados: ' + invalidControls);
    }
  }

  /**
   * Método que dado un formulario encuentra
   * aquellos controles que no están bien informados.
   * @param form formulario a comprobar.
   * @returns un array de aquellos controles que no están bien informados.
   */
  private getFormErrors(form: FormGroup): Array<string> {
    const invalid: Array<string> = [];

    for (const name in form.controls) {
        if (form.controls[name].invalid) {
            invalid.push(name + '');
        }
    }

    return invalid;
  }

}
