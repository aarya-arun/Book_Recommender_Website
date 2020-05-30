import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';


@Component({

    selector: 'app-select-genre-new',
    templateUrl: './select-genre-new.component.html'

})
export class SelectGenreNewComponent {

    constructor(private router: Router, private http: HttpClient, public userService: UserService) {}

    noofselectedgenres = 0;

    genres = [];

    paella = '';

    topfivedata = {};

    usernamezz = '';

    fnChangeBorder(p)
    {


      if (this.noofselectedgenres < 5)
      {
          if (!this.genres.includes(p))
          { this.genres.push(p);

            this.noofselectedgenres = this.noofselectedgenres + 1;
          }
          document.getElementById(p).style.border = '3px solid yellow'; }
      else
       { alert('You can only select 5 genres!');
         console.log(this.genres[0]); }

        }


    finaliseGenres()
    {

        // tslint:disable-next-line: triple-equals
        if (this.noofselectedgenres == 5)
        {
            this.paella = this.genres.toString();
            this.usernamezz = this.userService.getusername();




            this.topfivedata = {

            'username': this.usernamezz,
            'topfivelist': this.paella
        };



            this.http.post<{message: string}>('http://localhost:5000/api/topfive', this.topfivedata).subscribe((respdata) => {

            if (respdata.message.localeCompare('All good.') !== 0)
            {

                console.log('Never gonna happen');
              }
              else
              {
                const la = {};
                // tslint:disable-next-line: max-line-length
                this.http.post<{message: string}>('http://localhost:5000/api/books/topfiverecs/' + this.usernamezz, la).subscribe((nerespdata) => {

                    if (nerespdata.message.localeCompare('All good.') !== 0)
                    {

                        console.log('Never gonna happen');
                    }
                    else
                    {
                        this.userService.puttopfive();
                        this.router.navigate(['/l/userprofile']);

                    }



              });


                

             }



      });
    }
     else  {

            alert('You must select 5 genres!');
        }
    }
}
