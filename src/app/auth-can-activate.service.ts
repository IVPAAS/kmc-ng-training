import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthCanActivate implements CanActivate {
    constructor(private _router: Router/*, private _authenticationService: AuthenticationService*/) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        // 4.1 (advanced) - subscribe to AuthenticationService userContext update to allow/prevent
        // access to authenticated area
        // tips: use observable operators like 'first','map' and 'do'
        // also navigate to login if not authenticated - this._router.navigate(['login']);
        return Observable.of(true);
    }
}
