import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';




@Component({

    selector: 'app-del-dialogue',
    templateUrl: './del-dialogue.component.html',


  })

  export class DelDialogueComponent implements OnInit{

    // tslint:disable-next-line: max-line-length
    constructor(public userService: UserService, public dialogRef: MatDialogRef<DelDialogueComponent>, private router: Router, private http: HttpClient){}

    paella = '';
    deluserdata = {};
    username = '';
    age = -1;
    emailid = '';

    ngOnInit()
    {

            this.username = this.userService.getusername();
            this.age = this.userService.getage();
            this.emailid = this.userService.getemailid();

    }


    casablanca(){


        this.paella = this.userService.getusername();
        this.dialogRef.close();
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



        cabo()
        {
            this.dialogRef.close();
            this.router.navigate(['l/userprofile']);

        }






  }
