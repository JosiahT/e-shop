import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  appUser$;
  cart$;
  constructor(private auth: AuthService, private cartService: ShoppingCartService) { }

   async ngOnInit() {
    this.appUser$ = this.auth.appUser;
    this.cart$ = await this.cartService.getCart();
    /*(await this.cartService.getCart()).valueChanges()
      .subscribe((cart: any) => {
        this.totalQuantity = 0;
        // tslint:disable-next-line:forin
        for (const productId in cart.items) this.totalQuantity += cart.items[productId].quantity;
      });
      // alternative below
      /*.pipe(map((res: any) => res.items))
      .subscribe((items: any) =>
        this.totalQuantity = Array.from(Object.values(items), (item: any) => item.quantity).reduce((total, sum) => total + sum));*/
   }

   logout() {
    this.auth.logout();
   }
}
