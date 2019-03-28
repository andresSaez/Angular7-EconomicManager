import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardGuard } from './auth/auth-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',
    loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
    canLoad: [ AuthGuardGuard ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
})
export class AppRoutingModule { }
