/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/strict-boolean-expressions */
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { environment } from '../../../environments/environment'
import { AuthResponse, Usuario } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl
  private _usuario!: Usuario

  get usuario (): Usuario {
    return { ...this._usuario }
  }

  constructor (private readonly http: HttpClient) { }

  // service to register
  registro (name: string, email: string, password: string): Observable<AuthResponse | any> {
    const url = `${this.baseUrl}/auth/new`
    const body = { name, email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!)
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        // map se utiliza para transformar el resultado
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  // service to login
  login (email: string, password: string): Observable<AuthResponse | any> {
    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        // tap se utiliza para ejecutar una accion antes de que se ejecute el observable
        // usamos tap para guardar el token en el localstorage (utilidades)
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!)
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        // map se utiliza para transformar el resultado
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  // validar y regenerar el token
  validarToken (): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') ?? '') // ?? => si es null o undefined, se pone un string vacio

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token!)
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!
          }
          return resp.ok
        }),
        catchError(() => of(false))
      )
  }

  logout (): void {
    localStorage.clear()
  }
}
