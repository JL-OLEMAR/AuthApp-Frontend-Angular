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

  // service to login
  login (email: string, password: string): Observable<AuthResponse | any> {
    const url = `${this.baseUrl}/auth`
    const body = { email, password }

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
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  // renovar token
  renovarToken (): any {
    const url = `${this.baseUrl}/auth/renew`
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '') // eslint-disable-line

    return this.http.get(url, { headers })
  }
}
