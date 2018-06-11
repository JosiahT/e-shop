import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    // localStorage.removeItem('token');
  }

  isLoggedIn() {
/*
    const token = localStorage.getItem('token');
    if (!token) { return false; }
    return this.helper.isTokenExpired(token);*/
  }

  get appUser(): Observable<AppUser> {
    return this.user$.pipe(switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges();
      else return of(null);
    }));
   /* return this.afAuth.authState.subscribe( res => {
      if (res && res.displayName) {
        return res.displayName;
      }
      return null;
    }, err => {
      return null;
    });
    /*const token = localStorage.getItem('token');
    if (!token) { return null; }
    return this.helper.decodeToken(token);*/
  }
}
