import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private authService: AuthService) { }

  signInViaGoogle() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    /*this.authService.login()
        .subscribe(result => {
          if (result) {
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            this.router.navigate([returnUrl || '/']);
          } else {
            this.invalidLogin = true;
          }
        });*/
  }

}
