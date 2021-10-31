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
    // this.authService.renovarToken()
    //   .subscribe(console.log)

    const { email, password } = this.miFormulario.value

    this.authService.login(email, password)
      .subscribe(ok => {
        if (ok === true) {
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire('Error', ok, 'error')
        }
      })
  }
}
