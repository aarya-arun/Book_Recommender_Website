import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({

  selector: 'app-header-l',
  templateUrl: './header-l.component.html'


})
export class HeaderLComponent implements OnInit{

  username = 'Aarya';

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(){

    this.username = this.userService.getusername();
  }



  goHome()
  {
    console.log('HI');

    this.router.navigate(['/l/homepage']);

  }
}
