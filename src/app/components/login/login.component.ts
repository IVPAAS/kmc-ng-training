import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginService } from '../../services/login.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login-selector',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginSubscription: Subscription;
  ks: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {

    // create form and validation
    this.form = new FormGroup({
      entry_id: new FormControl(),
      username: new FormControl(),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    // listen to login result
    this.loginSubscription = this.loginService.userContext$.subscribe(
      (value) => {
        if (value !== null && value.userContext !== null && value.userContext.ks !== null) {
          this.ks = value.userContext.ks;
        }
      },
      (e) => {
        console.log(`received error: ${e}`);
      }
    );
  }

  // destroy subscriptions
  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  // call login service
  onSubmit(metaData) {
    this.loginService.login(metaData.username, metaData.password);
  }
}
