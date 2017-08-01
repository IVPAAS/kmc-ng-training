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

    constructor(/*private _authenticationService: AuthenticationService*/) {
    }

    public logout() : void
    {
        // Task 4.1 - execute logout
    }

    ngOnInit() {
        // Task 4.1 - show upper menu only when authenticated
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
