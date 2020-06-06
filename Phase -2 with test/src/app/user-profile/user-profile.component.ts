import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DelDialogueComponent } from '../del-dialogue/del-dialogue.component';


@Component({

  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',

})

export class UserProfileComponent implements OnInit{

  constructor(public userService: UserService, public dialog: MatDialog, private router: Router, private http: HttpClient) {}

  deluserdata = {};

  paella = '';

  username = '';
  age = -1;
  emailid = '';

  ngOnInit(){

    this.username = this.userService.getusername();
    this.age = this.userService.getage();
    this.emailid = this.userService.getemailid();
  }

  openDialog(){
    const dialogRef = this.dialog.open(DelDialogueComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }


  farfetched(){

    this.paella = this.userService.getusername();
    this.deluserdata = {

      // tslint:disable-next-line: object-literal-key-quotes
      'username': this.paella
    };


    this.http.post<{message: string}>('http://localhost:5000/api/deluser', this.deluserdata).subscribe((respdata) => {

            if (respdata.message.localeCompare('All good.') !== 0)
            {

                console.log('Never gonna happen');
              }
              else
              {

                this.router.navigate(['']);

             }



      });
  }


}
