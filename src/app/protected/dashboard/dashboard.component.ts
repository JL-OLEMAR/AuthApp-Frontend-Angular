/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { Router } from '@angular/router'

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
  constructor (private readonly router: Router) {}

  logout (): void {
    this.router.navigateByUrl('/auth')
  }
}
