import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanLoad {

  constructor( public authService: AuthService ) {}

  canActivate() {

    return this.authService.isAuth();

  }

  canLoad() {
    return this.authService.isAuth()
      .pipe(
        take(1)
      );
  }

}
