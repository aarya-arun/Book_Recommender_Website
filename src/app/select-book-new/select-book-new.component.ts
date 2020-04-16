import { Component} from '@angular/core';



@Component({

    selector: 'app-select-book-new',
    templateUrl: './select-book-new.component.html'

})
export class SelectBookNewComponent{

    noofselectedbooks = 0;

    fnChangeBorder(p)
    {
      this.noofselectedbooks = this.noofselectedbooks + 1;

      if (this.noofselectedbooks <= 15)
      { document.getElementById(p).style.border = '3px solid blue'; }
      else
       { alert('You can only select 15 books!'); }

    }

}
