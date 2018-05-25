import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent {
  appUser$;
  constructor(private auth: AuthService) {
    this.appUser$ = auth.appUser;
   }

   logout() {
    this.auth.logout();
   }
}
