import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';




@Component({

    selector: 'app-select-book-new',
    templateUrl: './select-book-new.component.html'

})
export class SelectBookNewComponent{

    constructor(private router: Router, private http: HttpClient, public userService: UserService) {}

    noofselectedbooks = 0;

    isbns = [];

    topfifteendata = {};

    paella = '';

    usernamezz = '';



    fnChangeBorder(p)
    {







      if (this.isbns.length < 15)
      {
        if (!this.isbns.includes(p))
        { this.isbns.push(p);

          this.noofselectedbooks = this.noofselectedbooks + 1;
        }




        document.getElementById(p).style.border = '3px solid blue';


     }
    else
    { alert('You can only select 15 books!'); }

    }





    finaliseBooks()
    {

       // tslint:disable-next-line: triple-equals
       if (this.isbns.length == 15){

        this.paella = this.isbns.toString();
        this.usernamezz = this.userService.getusername();




        this.topfifteendata = {

            // tslint:disable-next-line: object-literal-key-quotes
            'username': this.usernamezz,
            // tslint:disable-next-line: object-literal-key-quotes
            'topfifteenlist': this.paella
        };




        this.http.post<{message: string}>('http://localhost:5000/api/topfifteen', this.topfifteendata).subscribe((respdata) => {

            if (respdata.message.localeCompare('All good.') !== 0)
            {

                console.log('Never gonna happen');
            }
              else
              {
                const la = {};
                // tslint:disable-next-line: max-line-length
                this.http.post<{message: string}>('http://localhost:5000/api/books/topfifteenrecs/' + this.usernamezz, la).subscribe((nerespdata) => {

                    if (nerespdata.message.localeCompare('All good.') !== 0)
                    {

                        console.log('Never gonna happen');
                    }
                    else
                    {
                        this.userService.puttopfifteen();
                        this.router.navigate(['/l/f/g']);

                    }



              });




             }



      });
    }
    else{

        alert('You must select 15 books!');
       }




    }



}
