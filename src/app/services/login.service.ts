import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserLoginByLoginIdAction } from 'kaltura-typescript-client/types/UserLoginByLoginIdAction';
import { KalturaClient } from '@kaltura-ng/kaltura-client';

export interface UserContext {
    ks: string;
}

@Injectable()
export class LoginService {

    private _state = new BehaviorSubject<{ isBusy: boolean, errorMessage?: string }>({ isBusy: false });
    public state$ = this._state.asObservable();

    private _userContext = new BehaviorSubject<{ userContext: UserContext }>({ userContext: null });
    public userContext$ = this._userContext.asObservable();

    constructor(private _kalturaClient: KalturaClient) { }

    public login(userName: string, password: string): void {

        this._state.next({ isBusy: true });
        this._userContext.next({ userContext: null });

        this._kalturaClient.request(new UserLoginByLoginIdAction(
            {
                loginId: userName,
                password: password
            }
        )).subscribe(
            result => {
                this._state.next({ isBusy: false });
                this._userContext.next({ userContext: { ks: result } });
            },
            error => {
                this._state.next({ isBusy: false, errorMessage: error.message });
            }
            );
    }
}

