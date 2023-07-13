import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {

  constructor(private authservice: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.authservice.isAuthenticated();
  }

  redirectToLogin() {
    this.router.navigate(['login'])
  }

}

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AuthGuard).canActivate()) {
    return true;
  }
  
  inject(AuthGuard).redirectToLogin();
  return false;
};
