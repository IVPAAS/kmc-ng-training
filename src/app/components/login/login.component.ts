import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { LocalStorageService } from 'ng2-webstorage';
import { Observable } from 'rxjs';
import { UserLoginByLoginIdAction } from 'kaltura-typescript-client/types/UserLoginByLoginIdAction';
import { UserGetAction } from 'kaltura-typescript-client/types/UserGetAction';
import { KalturaClient } from '@kaltura-ng/kaltura-client';


@Component({
    selector: 'k-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: []
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    isBusy = false;
    errorMessage = '';
    _subscriptions: ISubscription[] = [];

    constructor(/*private _authenticationService: AuthenticationService,*/ private _fb: FormBuilder, private _router: Router,
                private _localService: LocalStorageService,
                private _kalturaClient: KalturaClient) {
    }

    ngOnInit() {
        this.loginForm = this._fb.group(
            {
                userName: ['', Validators.required],
                password: ['', Validators.required]
            });
    }

    login() {
        const {userName, password} = this.loginForm.value;

        // Task 4.1 - you should also subscribe to userContext$ changes so:
        // 1 - show errors / is busy when needed
        // 2 - navigate to entries once authenticated.

        // Task 4.1 (advanced) - disable the login button when busy.

        this.isBusy = true;
        this.errorMessage = null;

        // Task 4.1 - you should execute the relevant function in AuthenticationService
        // note the below function should be removed

        this._login(userName, password).subscribe(
            userContext =>
            {
                this.isBusy = false;

                this._kalturaClient.ks = userContext.ks;
                this._localService.store('userContext',userContext);

                this._router.navigate(['entries']);

            },
            reason =>
            {
                this.isBusy = false;
                this.errorMessage = reason.message;
            }
        );
    }

    private _login(userName: string, password: string): Observable<{ks : string, partnerId : string, fullName : string}> {

        // Task 4.1 - this function should move to the AuthenticationService and return 'void' instead.
        // since we want to use persist state with BehaviorSubject

        return Observable.create(observer =>
        {
            if (userName && password) {

                this._kalturaClient.multiRequest([
                    new UserLoginByLoginIdAction(
                        {
                            loginId: userName,
                            password: password
                        }
                    ),
                    new UserGetAction({}).setDependency((['ks', 0]))]).subscribe(
                    responses => {
                        if (responses.hasErrors()) {
                            observer.error(new Error('please try again'));
                        } else {
                            observer.next({
                                ks : responses[0].result,
                                fullName: responses[1].result.fullName,
                                partnerId: responses[1].result.partnerId
                            });
                            observer.complete();
                        }
                    }
                );
            } else {
                observer.error(new Error('missing one of the form arguments'));
            }
        });
    }

    ngOnDestroy() {
        this._subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}