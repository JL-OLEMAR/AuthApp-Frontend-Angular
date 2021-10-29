/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    name: ['Test2', [Validators.required]],
    email: ['test2@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor (
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  registro (): void {
    console.log(this.miFormulario.value)
    this.router.navigateByUrl('/dashboard')
  }
}
