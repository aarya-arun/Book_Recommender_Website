import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';


@Component({

  selector: 'app-shelves',
  templateUrl: './shelves.component.html'

})

export class ShelvesComponent implements OnInit{

  constructor(public userService: UserService, private http: HttpClient) {}

    username = 'Aarya';

    haveread = [];
    wanttoread = [];

    ngOnInit(){

      this.username = this.userService.getusername();

      this.http.get<{want_to_read, have_read}>('http://localhost:5000/api/shelves?user=' + this.username).subscribe((shelfdata) => {


        this.haveread = shelfdata.have_read;
        this.wanttoread = shelfdata.want_to_read;

        console.log(shelfdata.want_to_read[0]);


        const hakuna = ['', ''];
        const diff = 10 - this.haveread.length;
        if (diff > 0)
      {
          for (let i = 0; i < diff; i++) {
              this.haveread.push(hakuna);
      }
      }


        const hakuna1 = ['', ''];
        const diff1 = 10 - this.wanttoread.length;
        if (diff > 0)
      {
          for (let i = 0; i < diff1; i++) {
              this.wanttoread.push(hakuna1);
      }
      }


      });


  }


}
