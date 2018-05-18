import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent {
  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    afAuth.authState.subscribe(x => console.log(x));
   }

  logout() {
    this.afAuth.auth.signOut();
  }
}
