import { NgModule } from '@angular/core';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  declarations: [
    MenuNavComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    MenuNavComponent
  ]
})
export class CoreModule { }
