import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';


@Component({
    selector: 'k-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: []
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    _subscriptions: ISubscription[] = [];

    constructor(private _authenticationService: AuthenticationService, private _fb: FormBuilder, private _router: Router) {
    }

    ngOnInit() {
        this.loginForm = this._fb.group(
            {
                userName: ['', Validators.required],
                password: ['', Validators.required]
            });

        this._subscriptions.push(this._authenticationService.userContext$.subscribe(
            data => {
                if (data && data.ks) {
                    this._router.navigate(['entries']);
                }
            }
        ));
    }

    login() {
        const {userName, password} = this.loginForm.value;
        this._authenticationService.login(userName, password);
    }

    ngOnDestroy() {
        this._subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}