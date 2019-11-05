import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  @Output() loggedInUser: EventEmitter<any> = new EventEmitter<{any}>();

  ngOnInit() { }


  public loginUser(UserName: string, UserPassword: string): void {

    let aboutToTestUser = new User;
    aboutToTestUser.UserName = UserName;
    aboutToTestUser.UserPassword = UserPassword;
    
    this.loggedInUser.emit(aboutToTestUser);

  }


}
