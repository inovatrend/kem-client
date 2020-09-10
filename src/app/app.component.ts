import {Component, OnInit} from '@angular/core';
import {AuthService} from './login/auth.service';
import {LoginModel} from './login/model/LoginModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KEPClient';

  public loggedInUser: LoginModel = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedInUser
      .subscribe(resp => {
          if (localStorage.length > 0) {
            this.loggedInUser = new LoginModel(localStorage.getItem('username'), null);
          } else {
            this.loggedInUser = null;
          }
        },
        error => {
          console.log('ERROR RESPO:');
          console.log(error);
        });
  }

  public logout() {
    this.authService.logout();
    localStorage.clear();
  }
}
