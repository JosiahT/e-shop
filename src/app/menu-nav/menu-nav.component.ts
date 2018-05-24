import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent {
  user$;
  constructor(private auth: AuthService) {
    this.user$ = auth.currentUser;
   }

   logout() {
    this.auth.logout();
   }
}
