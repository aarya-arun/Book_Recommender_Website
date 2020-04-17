import { Component} from '@angular/core';
import { Router } from '@angular/router';



@Component({

    selector: 'app-select-book-new',
    templateUrl: './select-book-new.component.html'

})
export class SelectBookNewComponent{

    constructor(private router: Router) {}

    noofselectedbooks = 0;

    isbns=[];


    fnChangeBorder(p)
    {





      if (this.noofselectedbooks < 15)
      {
        if(p.localeCompare('img1'))
        {
            this.isbns.push('836218523');
        }
        if(p.localeCompare('img2'))
        {
            this.isbns.push('1401201911');
        }
        if(p.localeCompare('img3'))
        {
            this.isbns.push('61147974');
        }
        if(p.localeCompare('img4'))
        {
            this.isbns.push('1423116968');
        }
        if(p.localeCompare('img5'))
        {
            this.isbns.push('142403881');
        }
        if(p.localeCompare('img6'))
        {
            this.isbns.push('039480001X');
        }
        if(p.localeCompare('img7'))
        {
            this.isbns.push('60513098');
        }
        if(p.localeCompare('img8'))
        {
            this.isbns.push('446585025');
        }
        if(p.localeCompare('img9'))
        {
            this.isbns.push('340796146');
        }
        if(p.localeCompare('img10'))
        {
            this.isbns.push('312362080');
        }
        if(p.localeCompare('img11'))
        {
            this.isbns.push('450040186');
        }
        if(p.localeCompare('img12'))
        {
            this.isbns.push('345419626');
        }
        if(p.localeCompare('img13'))
        {
            this.isbns.push('99446782');
        }
        if(p.localeCompare('img14'))
        {
            this.isbns.push('078512179X');
        }
        if(p.localeCompare('img15'))
        {
            this.isbns.push('679783261');
        }
        if(p.localeCompare('img16'))
        {
            this.isbns.push('425227510');
        }
        if(p.localeCompare('img17'))
        {
            this.isbns.push('345404475');
        }
        if(p.localeCompare('img18'))
        {
            this.isbns.push('143039563');
        }
        if(p.localeCompare('img19'))
        {
            this.isbns.push('743477545');
        }
        if(p.localeCompare('img20'))
        {
            this.isbns.push('375831002');
        }
        if(p.localeCompare('img21'))
        {
            this.isbns.push('525951652');
        }
        if(p.localeCompare('img22'))
        {
            this.isbns.push('439636485');
        }
        if(p.localeCompare('img23'))
        {
            this.isbns.push('1416563725');
        }
        if(p.localeCompare('img24'))
        {
            this.isbns.push('752224417');
        }if(p.localeCompare('img25'))
        {
            this.isbns.push('553803719');
        }if(p.localeCompare('img26'))
        {
            this.isbns.push('553816713');
        }
        if(p.localeCompare('img27'))
        {
            this.isbns.push('385344430');
        }
        if(p.localeCompare('img28'))
        {
            this.isbns.push('345391802');
        }
        if(p.localeCompare('img29'))
        {
            this.isbns.push('452277752');
        }
        if(p.localeCompare('img30'))
        {
            this.isbns.push('192833596');
        }
        if(p.localeCompare('img31'))
        {
            this.isbns.push('61054887');
        }
        if(p.localeCompare('img32'))
        {
            this.isbns.push('425263916');
        }
        if(p.localeCompare('img33'))
        {
            this.isbns.push('140449264');
        }
        if(p.localeCompare('img34'))
        {
            this.isbns.push('60598328');
        }
        if(p.localeCompare('img35'))
        {
            this.isbns.push('006056251X');
        }
        if(p.localeCompare('img36'))
        {
            this.isbns.push('316017922');
        }
        if(p.localeCompare('img37'))
        {
            this.isbns.push('751529818');
        }
        if(p.localeCompare('img38'))
        {
            this.isbns.push('440800463');
        }
        if(p.localeCompare('img39'))
        {
            this.isbns.push('393068471');
        }
        if(p.localeCompare('img40'))
        {
            this.isbns.push('393072231');
        }
        if(p.localeCompare('img41'))
        {
            this.isbns.push('1600963943');
        }
        if(p.localeCompare('img42'))
        {
            this.isbns.push('140123206X');
        }
        if(p.localeCompare('img43'))
        {
            this.isbns.push('1781162646');
        }
        if(p.localeCompare('img44'))
        {
            this.isbns.push('192123092');
        }
        if(p.localeCompare('img45'))
        {
            this.isbns.push('316015849');
        }
        if(p.localeCompare('img46'))
        {
            this.isbns.push('439358078');
        }
        if(p.localeCompare('img47'))
        {
            this.isbns.push('553588486');
        }
        if(p.localeCompare('img48'))
        {
            this.isbns.push('525478817');
        }
        if(p.localeCompare('img49'))
        {
            this.isbns.push('1406321346');
        }
        if(p.localeCompare('img50'))
        {
            this.isbns.push('786856866');
        }
        if(p.localeCompare('img51'))
        {
            this.isbns.push('307277674');
        }
        if(p.localeCompare('img52'))
        {
            this.isbns.push('1444736930');
        }
        if(p.localeCompare('img53'))
        {
            this.isbns.push('618346252');
        }
        if(p.localeCompare('img54'))
        {
            this.isbns.push('312641893');
        }
        if(p.localeCompare('img55'))
        {
            this.isbns.push('670038601');
        }
        if(p.localeCompare('img56'))
        {
            this.isbns.push('316036196');
        }
        if(p.localeCompare('img57'))
        {
            this.isbns.push('439206472');
        }
        if(p.localeCompare('img58'))
        {
            this.isbns.push('743454537');
        }
        if(p.localeCompare('img59'))
        {
            this.isbns.push('1594480001');
        }
        if(p.localeCompare('img60'))
        {
            this.isbns.push('439023483');
        }




















        this.noofselectedbooks = this.noofselectedbooks + 1;
          document.getElementById(p).style.border = '3px solid blue'; }
      else
       { alert('You can only select 15 books!'); }

    }

    finaliseBooks()
    {

       // tslint:disable-next-line: triple-equals
       if (this.noofselectedbooks == 15){

        this.router.navigate(['/l/f/g']);

       }
       else{

        alert('You must select 15 books!');
       }


    }

}
