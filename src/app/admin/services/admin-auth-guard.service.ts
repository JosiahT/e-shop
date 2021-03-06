import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private userService: UserService) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.appUser
      .pipe(map(appUser => appUser.isAdmin));
  }
}
