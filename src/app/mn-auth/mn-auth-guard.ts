import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class MnAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (window.localStorage.getItem('token') !== null
            && window.localStorage.getItem('user_data') !== null) {
            return true;
        }
        this.router.navigate(['/login'], {
            queryParams: { redirectTo: state.url }
        });
        return false;
    }
}
