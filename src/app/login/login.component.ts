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
  constructor(private formBuilder: FormBuilder,
              public authService: AuthService) {
    this.loginForm = formBuilder.group({
      'username': null,
      'password': null
    });
  }

  ngOnInit() {
    localStorage.clear();
  }

  public onSubmit(event): void {
    if (this.loginForm.valid
      && event.key === 'Enter' || event.type === 'click') {

      const loginModel = new LoginModel(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      );

      this.authService.login(loginModel);
      this.authService.loggedInUser.subscribe(respo => {
        if (this.loginForm.get('username').value != null && this.authService.error == null) {
          localStorage.setItem('username', this.loginForm.get('username').value);
        } else {
          this.errorHandler = 'Username or password invalid!';
        }
      });
    }
  }
}
