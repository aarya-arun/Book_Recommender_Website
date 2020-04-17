import {Component, OnInit} from '@angular/core';
import { BookService } from '../book.service';


@Component({

  selector: 'app-book-profile',
  templateUrl: './book-profile.component.html',
  //styleUrls: ['./book-profile.component.css']

})

export class BookProfileComponent implements OnInit {
  
  constructor(private bookservice: BookService){}
   author = '';
   description = '';
   imageurl = '';
    rating = -1;
     ratingscount = -1;
    title = '';
     year = -1;

    readMore() {
      // tslint:disable-next-line: prefer-const
      let dots = document.getElementById('dots');
      // tslint:disable-next-line: prefer-const
      let moreText = document.getElementById('more');
      // tslint:disable-next-line: prefer-const
      let btnText = document.getElementById('read-more');

      if (dots.style.display === 'none') {
        dots.style.display = 'inline';
        btnText.innerHTML = 'Read more';
        moreText.style.display = 'none';
      } else {
        dots.style.display = 'none';
        btnText.innerHTML = 'Read less';
        moreText.style.display = 'inline';
      }
    }


    ngOnInit()
    {
      this.author=this.bookservice.getauthor();
      this.description=this.bookservice.getsdescription();
      this.imageurl=this.bookservice.getimage();
      this.rating=this.bookservice.getrating();
      this.ratingscount=this.bookservice.getratingscount();
      this.title=this.bookservice.gettitle();
      this.year=this.bookservice.getyear();
    }
}