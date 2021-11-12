/* eslint-disable @typescript-eslint/promise-function-async */
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ValidarTokenGuard } from './guards/validar-token.guard'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) // lazy loading
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  { path: '**', redirectTo: 'auth' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true, significa que todas las rutas que se definan en el modulo de rutas, se definen con el #
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
