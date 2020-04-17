import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';


@Component({

  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',

})

export class UserProfileComponent implements OnInit{

  

  constructor(public userService: UserService) {}

  ngOnInit(){

    this.username = this.userService.getusername();
    this.age = this.userService.getage();
    this.emailid = this.userService.getemailid();
  }

  username = '';
  age = -1;
  emailid = '';

  
}
