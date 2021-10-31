/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor (
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  login (): any {
    const { email, password } = this.miFormulario.value

    this.authService.login(email, password)
      .subscribe(ok => {
        (ok === true)
          ? this.router.navigateByUrl('/dashboard')
          : Swal.fire('Error', ok, 'error')
      })
  }
}
