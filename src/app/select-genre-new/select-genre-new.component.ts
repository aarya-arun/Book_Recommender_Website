import { Component} from '@angular/core';
import { Router } from '@angular/router';


@Component({

    selector: 'app-select-genre-new',
    templateUrl: './select-genre-new.component.html'

})
export class SelectGenreNewComponent {

    constructor(private router: Router) {}

    noofselectedgenres = 0;
    
    genres=[];

    fnChangeBorder(p)
    {


      if (this.noofselectedgenres < 5)
      {   
           this.genres.push(p);
        
          this.noofselectedgenres = this.noofselectedgenres + 1;
          document.getElementById(p).style.border = '3px solid yellow'; }
      else
       { alert('You can only select 5 genres!'); 
         console.log(this.genres[0]);}

    }


    finaliseGenres()
    {

        // tslint:disable-next-line: triple-equals
        if (this.noofselectedgenres == 5)
        {
            this.router.navigate(['/l/homepage']);
        }
        else{

            alert('You must select 5 genres!');
        }
    }
}
