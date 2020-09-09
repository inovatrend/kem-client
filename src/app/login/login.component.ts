import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from './auth.service';
import {LoginModel} from './model/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorHandler: string;
  public loginForm: FormGroup;
  public loggedInUser: LoginModel = null;


  constructor(private formBuilder: FormBuilder,
              public authService: AuthService) {
    this.loginForm = formBuilder.group({
      'username': null,
      'password': null
    });
  }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {

      const loginModel = new LoginModel(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      );

      this.authService.login(loginModel);
      this.authService.loggedInUser.subscribe(respo => {
        if (this.loginForm.get('username').value != null && this.loginForm.get('password').value != null
            && this.authService.error == null) {
          sessionStorage.setItem('username', this.loginForm.get('username').value);
          sessionStorage.setItem('password', this.loginForm.get('password').value);

        } else {
          this.errorHandler = 'Username or password invalid!';
        }
      });
    }
    // this.loginService.getToken(this.loginForm.get('token').value);
  }

}
