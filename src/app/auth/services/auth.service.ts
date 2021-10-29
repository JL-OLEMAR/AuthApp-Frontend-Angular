import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment } from '../../../environments/environment'
import { AuthResponse } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl

  constructor (private readonly http: HttpClient) { }

  // service to login
  login (email: string, password: string): Observable<AuthResponse> {
    // url to login
    const url = `${this.baseUrl}/auth`

    // body to send
    return this.http.post<AuthResponse>(url, { email, password })
  }
}
