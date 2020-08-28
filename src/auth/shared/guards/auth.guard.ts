import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.authState.map((user) => {
      if (!user) {
        this.router.navigate(["/auth/login"]);
      }
      // double bang, casting over to boolean
      return !!user;
    });
  }
}
