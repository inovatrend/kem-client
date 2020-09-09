import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {Router} from '@angular/router';
import {UserModel} from './model/UserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;
  public errorHandler: boolean = false;
  public errorMessage: string = null;

  constructor(private registerService: RegisterService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.userForm = formBuilder.group({
      'id': null,
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'repeatPassword': [null, Validators.required],
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.userForm.valid && this.userForm.get('password').value === this.userForm.get('repeatPassword').value) {
      const userModel = new UserModel(
        this.userForm.get('id').value,
        this.userForm.get('username').value,
        this.userForm.get('password').value,
        this.userForm.get('repeatPassword').value,
        this.userForm.get('firstname').value,
        this.userForm.get('lastname').value
      );

      this.registerService.saveUser(userModel)
        .subscribe(resp => {
          this.router.navigate(['/login']);
        });
    }
    else if (this.userForm.get('password').value !== this.userForm.get('repeatPassword').value) {
      this.errorHandler = true;
      this.errorMessage = 'Passwords do not match!';
    }
    else if (!(this.userForm.get('password').value) &&
      !(this.userForm.get('repeatPassword').value) &&
      !(this.userForm.get('username').value)) {
      this.errorHandler = true;
      this.errorMessage = 'There is some errors!';
    }
  }

}
