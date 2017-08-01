import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserLoginByLoginIdAction } from 'kaltura-typescript-client/types/UserLoginByLoginIdAction';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

export interface UserContext {
    ks: string;
}

@Injectable()
export class AuthenticationService {

    private _state = new BehaviorSubject<{ isBusy: boolean, errorMessage?: string }>({isBusy: false});
    public state$ = this._state.asObservable();

    private _userContext = new BehaviorSubject<UserContext>(null);
    public userContext$ = this._userContext.asObservable();

    constructor(private _localService: LocalStorageService, private _kalturaClient: KalturaClient) {
        const localStorageData = this._localService.retrieve('auth.ks');
        if (localStorageData) {
            this._updateState(localStorageData.ks);
        }
    }

    public automaticLogin() : void
    {
        const ks = this._localService.retrieve('auth.ks');

    }

    public logout() : void{
        this._updateState(null);
    }
    private _updateState(ks : string) : void{

        if (ks)
        {
            this._localService.store('auth.ks', {ks});

            this._kalturaClient.ks = ks;
            this._userContext.next({ks});
        }else {
            this._localService.clear('auth.ks');
            this._kalturaClient.ks = null;
            this._userContext.next(null);
        }
    }

    public login(userName: string, password: string): void {

        if (userName && password) {
            this._updateState(null);
            this._state.next({isBusy: true});

            this._kalturaClient.request(new UserLoginByLoginIdAction(
                {
                    loginId: userName,
                    password: password,
                    privileges: "disableentitlement"
                }
            )).subscribe(
                result => {
                    this._state.next({isBusy: false});
                    this._updateState(result);
                },
                error => {
                    this._state.next({isBusy: false, errorMessage: error.message});
                }
            );
        }else
        {
            this._state.next({isBusy: false, errorMessage: 'missing one of the form arguments'});
        }
    }
}

