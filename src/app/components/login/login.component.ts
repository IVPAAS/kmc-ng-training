import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'k-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isValid: boolean;
  isDirty: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        entryId: new FormControl('', Validators.compose([Validators.required])),
        userName: new FormControl(),
        password: new FormControl()
      });
  }

  login() {
    console.log("EntryId: " + this.loginForm.value.entryId
      + " Username: " + this.loginForm.value.userName
      + " Passowrd: " + this.loginForm.value.password);

      this.loginService.login(this.loginForm.value.userName, this.loginForm.value.password)
  }
}