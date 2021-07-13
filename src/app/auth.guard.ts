import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  logincheck: any;
  constructor(private routes: Router, private loginservice: LoginService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.loginservice.getlogin().subscribe(
        res=>{
          this.logincheck = res
          // console.log(res);
          
        }
      )
    if (this.logincheck != false) {
      return true;
    }
    else {
      this.routes.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}