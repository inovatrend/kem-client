import {Component, OnInit} from '@angular/core';
import {MessengerService} from './messenger.service';
import {AuthService} from '../login/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../register/model/UserModel';
import {KafkaMessageModel} from './model/KafkaMessageModel';
import {interval} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  public messages: KafkaMessageModel[] = [];
  public userSelectList: UserModel[] = [];
  public loggedInUser: UserModel;
  public errorHandler: boolean = false;
  public messageForm: FormGroup;
  public selectedUser: string;

  constructor(public messengerService: MessengerService,
              public authService: AuthService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.hide();

    this.initBasicForm();
    this.selectedUser = this.messageForm.get('selectUser').value;

    this.userSelectList = [];
    this.authService.getAllUsers()
      .subscribe(resp => {
          resp.forEach(user => {
            if (user.username != 'admin') {
              this.userSelectList.push(user);
            }
          });
        },
        error => {
          console.log('ERROR RESPONSE:');
          console.log(error);
        });

    this.authService.getUserByUsername(localStorage.getItem('username'))
      .subscribe(user => {
        this.loggedInUser = user;
      });
  }

  onChange() {
    this.selectedUser = this.messageForm.get('selectUser').value;
    this.selectedUserCheck();

    this.spinner.show();

    let subscriptionInterval = interval(3000)
      .subscribe(respo => {
        if (respo) {
          this.spinner.hide();
        }
        if (localStorage.length <= 0) {
          subscriptionInterval.unsubscribe();
        }
        this.messengerService.loadMessage(this.loggedInUser.userId, this.messageForm.get('selectUser').value)
          .subscribe(messages => {
            this.messages = messages;
          });
      });
  }

  private selectedUserCheck() {
    if (this.selectedUser !== null) {
      this.messageForm.get('messageForSend').enable();
    } else {
      this.messageForm.get('messageForSend').disable();
    }
  }

  onSubmit(event) {
    if (event.key === 'Enter' || event.type === 'click' && this.messageForm.get('messageForSend').value !== null) {
      this.authService.getUserByUsername(localStorage.getItem('username'))
        .subscribe(user => {

          const kafkaMessage = new KafkaMessageModel(
            Date.now(),
            this.messageForm.get('messageForSend').value,
            user.username,
            user.userId,
            this.messageForm.get('selectUser').value
          );
          this.messengerService.sendMessage(kafkaMessage).subscribe(respo => {
            this.messageForm.get('messageForSend').reset();
          });
        });

    }
  }

  public initBasicForm() {
    this.messageForm = this.formBuilder.group({
      'selectUser': [null, Validators.required],
      'messageForSend': [null, Validators.required],
    });
  }
}
