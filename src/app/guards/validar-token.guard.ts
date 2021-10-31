/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { AuthService } from '../auth/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor (
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  // controla si el usuario puede acceder a la ruta
  canActivate (): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        // usamos el tap para redirigir al usuario si no está autenticado (utilidades)
        tap(estaAutenticado => {
          if (!estaAutenticado) { this.router.navigateByUrl('/auth') }
        })
      )
  }

  // controla si el usuario puede cargar el contenido
  canLoad (): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        // usamos el tap para redirigir al usuario si no está autenticado (utilidades)
        tap(estaAutenticado => {
          if (!estaAutenticado) { this.router.navigateByUrl('/auth') }
        })
      )
  }
}
