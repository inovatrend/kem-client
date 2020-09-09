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

          if (sessionStorage.length > 0) {
            this.loggedInUser = new LoginModel(sessionStorage.getItem('username'), sessionStorage.getItem('password'));
            console.log(this.loggedInUser);
          } else {
            this.loggedInUser = null;
          }
        },
        error => {
          console.log('ERROR RESPO:');
          console.log(error);
        });
  }
}
