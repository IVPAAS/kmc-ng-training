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

    private _getKSFromCache() : string{
        return this._localService.retrieve('auth.ks');
    }

    private _clearKSInCache() : void{
        this._localService.clear('auth.ks');
    }

    private _updateKSInCache(ks : string) : void{
        this._localService.store('auth.ks',ks);
    }

    private _automaticLogin(): void {

        // Task 4.1 (advanced) - pseudo code:
        // 1 - get ks from cache using method '_getKSFromCache'
        // 2 - if got any then update state to busy and execute a UserGetAction with that ks
        // 3 - if succeded then execute method '_updateState' with the relevant information
        // 4 - otherwise, clear the ks from the cache.
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

        // Task 4.1 - move the function '_login' from 'login.component.ts'
        // notice that the signature now returns void.
        // you should update property '_state' instead
        // pseudo code:
        // 1 - if provided userName and password then
        // 1.1 - update '_state' to busy
        // 1.1 - use multiRequest to execute both 'UserLoginByLoginIdAction' and 'UserGetAction'
        //       tip - on the 'UserGetAction' chain '.setDependency((['ks', 0]))])' so it will get the KS from the first action
        // 1.2 - use the '.hasErrors()' function on the responses to check if authentication succeeded
        // 1.3 - update '_state' to not busy and include error message if needed
        // 1.4 - run the following to update user context: this._updateState(responses[0].result, responses[1].result.fullName, responses[1].result.partnerId);
        // 2 - if NOT provided userName and password then update _state with error message

    }
}

