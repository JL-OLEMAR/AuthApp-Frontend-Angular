/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
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
  login (email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(() => of(false))
      )
  }
}
