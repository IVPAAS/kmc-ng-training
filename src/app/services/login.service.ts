import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { UserLoginByLoginIdAction } from 'kaltura-typescript-client/types/UserLoginByLoginIdAction';
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
        // get KS for environment incase local mode
        if (environment.ks.length > 0) {
            _kalturaClient.ks = environment.ks;
            this._userContext.next({ userContext: { ks: environment.ks } });
        }
    }

    login(username: string, password: string): void {

        this._state.next({ isBusy: true });
        this._userContext.next({ userContext: null });

        this._kalturaClient.request(new UserLoginByLoginIdAction(
            {
                loginId: username,
                password: password
            }
        )).subscribe(
            result => {

                this._state.next({ isBusy: false });
                this._userContext.next({ userContext: { ks: result } });
                this._kalturaClient.ks = result;
                console.log(`login result: ${result}`);
            },
            error => {
                this._state.next({ isBusy: false, errorMessage: error.message });
                console.log(`error while trying to login: ${error}`);
            }
            );
    }
}
