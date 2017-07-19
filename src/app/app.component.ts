import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy{
  title = 'app';

  isValid: boolean = false;
  subscription: Subscription;

  constructor(private loginService: LoginService) {    
   }

  ngOnInit() {        
    this.subscription = this.loginService.userContext$.subscribe(
      (value) => {        
        if (value !== null && value.userContext !== null && value.userContext.ks !== null) {          
          this.isValid = true;          
        }
      },
      (e) => {
        console.log(`received error: ${e}`);
        this.isValid = false;
      }
    );
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
 }
}
