import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    name: ['Test2', [Validators.required]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor (private readonly fb: FormBuilder) {}

  registro (): void {
    console.log('Formulario: ', this.miFormulario)
  }
}
