import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthCanActivate implements CanActivate {
    constructor(private _router: Router, private _authenticationService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this._authenticationService.userContext$
            .first()
            .map(response => {
                    return response && !!response.ks;
                }
            ).do(
                (status) =>
                {
                    if (!status)
                    {
                        this._router.navigate(['login']);
                    }
                }
            );
    }
}
