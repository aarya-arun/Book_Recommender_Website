import { Component} from '@angular/core';


@Component({

    selector: 'app-select-genre-new',
    templateUrl: './select-genre-new.component.html'

})
export class SelectGenreNewComponent {

    noofselectedgenres = 0;

    fnChangeBorder(p)
    {
      this.noofselectedgenres = this.noofselectedgenres + 1;

      if (this.noofselectedgenres <= 5)
      { document.getElementById(p).style.border = '3px solid yellow'; }
      else
       { alert('You can only select 5 genres!'); }

    }
}
