import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      console.log('user', user);
      if (user) return true;
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
      return false;
    }));
    /*if (this.auth.currentUser) { return true; }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
    return false;
    /*for admin-auth-guard
    const user = this.authService.currentUser;
    if (user && user.admin) { return true; }
    this.router.navigate(['/no-access']);
    return false;
    */
  }
}
