/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { Usuario } from 'src/app/auth/interfaces/interfaces.js'
import { AuthService } from '../../auth/services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    * {
      margin: 15px;
    }
  `]
})
export class DashboardComponent {
  get usuario (): Usuario {
    return this.authService.usuario
  }

  constructor (
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  logout (): void {
    this.authService.logout()
    this.router.navigateByUrl('/auth')
  }
}
