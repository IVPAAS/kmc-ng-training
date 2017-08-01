import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserLoginByLoginIdAction } from 'kaltura-typescript-client/types/UserLoginByLoginIdAction';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import { UserGetAction } from 'kaltura-typescript-client/types/UserGetAction';

export interface UserContext {
    ks: string;
    fullname: string;
}

@Injectable()
export class AuthenticationService {

    private _state = new BehaviorSubject<{ isBusy: boolean, errorMessage?: string }>({isBusy: false});
    public state$ = this._state.asObservable();

    private _userContext = new BehaviorSubject<UserContext>(null);
    public userContext$ = this._userContext.asObservable();

    constructor(private _localService: LocalStorageService, private _kalturaClient: KalturaClient) {
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
                            this._updateState(ks, response.fullName);
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
    }

    private _updateState(ks: string, fullname?: string): void {

        if (ks) {
            this._localService.store('auth.ks', ks);

            this._kalturaClient.ks = ks;
            this._userContext.next({ks, fullname});
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
                        this._updateState(responses[0].result, responses[1].result.fullName);
                    }
                }
            );
        } else {
            this._state.next({isBusy: false, errorMessage: 'missing one of the form arguments'});
        }
    }
}

