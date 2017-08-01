import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { UserLoginByLoginIdAction } from 'kaltura-typescript-client/types/UserLoginByLoginIdAction';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import { UserGetAction } from 'kaltura-typescript-client/types/UserGetAction';
import { Router } from '@angular/router';

export interface UserContext {
    ks: string;
    fullname: string;
    partnerId: number;
}

@Injectable()
export class AuthenticationService {

    private _state = new BehaviorSubject<{ isBusy: boolean, errorMessage?: string }>({isBusy: false});
    public state$ = this._state.asObservable();

    private _userContext = new ReplaySubject<UserContext>(1);
    public userContext$ = this._userContext.asObservable();

    constructor(private _localService: LocalStorageService, private _kalturaClient: KalturaClient, private _router: Router) {
        this._automaticLogin();
    }

    private _automaticLogin(): void {
        const localStorageData = this._localService.retrieve('auth.ks');
        if (localStorageData) {

            const ks = this._localService.retrieve('auth.ks');

            if (ks) {
                this._state.next({isBusy: true});
                this._kalturaClient.request(
                    new UserGetAction({
                        ks
                    }))
                    .subscribe(
                        response => {

                            this._state.next({isBusy: false});
                            this._updateState(ks, response.fullName, response.partnerId);
                        },
                        error => {
                            console.log(error.message);

                            this._localService.clear('auth.ks');
                        }
                    );
            }
        }
    }

    public logout(): void {
        this._updateState(null);
        this._router.navigate(['login']);
    }

    private _updateState(ks: string, fullname?: string, partnerId?: number): void {

        if (ks) {
            this._localService.store('auth.ks', ks);

            this._kalturaClient.ks = ks;
            this._userContext.next({ks, fullname, partnerId});
        } else {
            this._localService.clear('auth.ks');
            this._kalturaClient.ks = null;
            this._userContext.next(null);
        }
    }

    public login(userName: string, password: string): void {

        if (userName && password) {
            this._updateState(null);
            this._state.next({isBusy: true});

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
                        this._state.next({isBusy: false, errorMessage: 'please try again'});
                    } else {
                        this._state.next({isBusy: false});
                        this._updateState(responses[0].result, responses[1].result.fullName, responses[1].result.partnerId);
                    }
                }
            );
        } else {
            this._state.next({isBusy: false, errorMessage: 'missing one of the form arguments'});
        }
    }
}

