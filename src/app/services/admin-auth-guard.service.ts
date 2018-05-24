import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private db: AngularFireDatabase) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      console.log('user', user);
      if (user && user.uid) {
        const user$ = this.db.object('/users/' + user.uid);
        if (user$ && user$['isAdmin']) return true;
      }
      this.router.navigate(['/']);
      return false;
    }));
  }
}
