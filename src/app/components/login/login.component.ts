import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'k-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
    providers : []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _authenticationService: AuthenticationService, private _fb : FormBuilder) { }

  ngOnInit() {
    this.loginForm = this._fb.group(
      {
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  login() {
      const { userName, password } = this.loginForm.value;
      this._authenticationService.login(userName,password);
  }
}