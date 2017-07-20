import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'app';
  public isLoggedIn = false;
  subscriptionLogin: Subscription;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    // listen to login result
    this.subscriptionLogin = this.loginService.userContext$.subscribe(
      (value) => {
        if (value !== null && value.userContext !== null && value.userContext.ks !== null) {
          this.isLoggedIn = true;
        }
      },
      (e) => {
        console.log(`received error: ${e}`);
        this.isLoggedIn = false;
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionLogin.unsubscribe();
  }
}
