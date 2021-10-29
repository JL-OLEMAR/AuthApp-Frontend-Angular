/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

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
    private readonly router: Router
  ) { }

  login (): void {
    console.log(this.miFormulario.value)
    this.router.navigateByUrl('/dashboard')
  }
}
