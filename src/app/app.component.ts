import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ISubscription } from 'rxjs/Subscription';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';

    isAuthenticated: boolean = false;
    subscription: ISubscription;

    constructor(private _authenticationService: AuthenticationService) {
    }

    public logout() : void
    {
        this._authenticationService.logout();
    }

    ngOnInit() {
        this.subscription = this._authenticationService.userContext$.subscribe(
            (userContext) => {
                this.isAuthenticated = userContext && !!userContext.ks;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
