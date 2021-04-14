import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Método para hacer login que el usuario
   * indicado.
   * @param user usuario que desea hacer login.
   */
  public login(user: User): void {
    console.log('Formulario correcto. Datos: ');
    console.log(user);
  }

  /**
   * Método para mostrar un error si el login ha ido mal.
   * @param error descripción del error.
   */
  public showLoginError(error: string): void {
    console.log('Formulario incorrecto. Causa: ');
    console.log(error);
  }

}
