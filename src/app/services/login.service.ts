import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserLoginByLoginIdAction } from 'kaltura-typescript-client/types/UserLoginByLoginIdAction';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { environment } from '../../environments/environment';


export interface UserContext {
    ks: string;
}

@Injectable()
export class LoginService {

    private _state = new BehaviorSubject<{ isBusy: boolean, errorMessage?: string }>({ isBusy: false });
    public state$ = this._state.asObservable();

    private _userContext = new BehaviorSubject<{ userContext: UserContext }>({ userContext: null });
    public userContext$ = this._userContext.asObservable();

    constructor(private _kalturaClient: KalturaClient) {
        if (environment.ks) {
            _kalturaClient.ks = environment.ks;
            this._userContext.next({ userContext: { ks: environment.ks } });
        }
    }

    public login(userName: string, password: string): void {

        this._state.next({ isBusy: true });
        this._userContext.next({ userContext: null });

        this._kalturaClient.request(new UserLoginByLoginIdAction(
            {
                loginId: userName,
                password: password,
                privileges: "disableentitlement"
            }
        )).subscribe(
            result => {
                this._state.next({ isBusy: false });
                this._kalturaClient.ks = result;
                this._userContext.next({ userContext: { ks: result } });
            },
            error => {
                this._state.next({ isBusy: false, errorMessage: error.message });
            }
            );
    }
}

