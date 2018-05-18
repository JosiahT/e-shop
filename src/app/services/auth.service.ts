import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
/*import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(credentials) {
    const profile = this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
                  .then(res => {
                    console.log(res);
                  });
    /*return this.http.post('/api/authenticate', JSON.stringify(credentials))
    .map(response => {
      let res = response.json();
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        const x = new JwtHelper().decodeToken(res.token);
        console.log('x', x);
        return true;
      }
      return false;
    });*/
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    // return tokenNotExpired();
  }

  get currentUser() {
    return null;
    /*const token = localStorage.getItem('token');
    if (!token) { return null; }
    return new JwtHelper().decodeToken(token); */
  }
}
