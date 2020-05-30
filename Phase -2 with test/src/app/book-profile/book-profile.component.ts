import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';



@Component({

  selector: 'app-book-profile',
  templateUrl: './book-profile.component.html',
  // styleUrls: ['./book-profile.component.css']

})

export class BookProfileComponent implements OnInit{

    constructor(private http: HttpClient, public bookService: BookService, public userservice: UserService) {}


    isbn = '';
    booktitle = '';
    author = '';
    publishdate = -1;
    ratingcount = -1;
    rating = -1;
    desc = '';
    image = '';
    username = '';
    kahuna = {};
    partialdesc ='';
    restofdesc = '';
    len =0;


    ngOnInit(){

      this.isbn = this.bookService.getisbn();
      this.booktitle = this.bookService.getbooktitle();
      this.author = this.bookService.getauthor();
      this.publishdate = this.bookService.getpublishdate();
      this.ratingcount = this.bookService.getratingcount();
      this.rating = this.bookService.getrating();
      this.desc = this.bookService.getdesc();
      this.image = this.bookService.getimage();
      this.username = this.userservice.getusername();
      this.len = this.desc.length;

      this.partialdesc = this.desc.substring(0,75);
      this.restofdesc = this.desc.substring(75,this.len);

      console.log(this.desc);
    }





    wannaread()
    {



      this.kahuna = {

        'isbn': this.isbn,
        'username': this.username

      };

      this.http.post<{message: string}>('http://localhost:5000/api/books/wannaread', this.kahuna).subscribe((nerespdata) => {


      console.log(nerespdata.message);

      });
    }

haveread()
{


      this.kahuna = {

        'isbn': this.isbn,
        'username': this.username

      };

      this.http.post<{message: string}>('http://localhost:5000/api/books/haveread', this.kahuna).subscribe((nerespdata) => {


    console.log(nerespdata.message);

    });


    }

readMore() {
      const dots = document.getElementById('dots');
      const moreText = document.getElementById('more');
      const btnText = document.getElementById('read-more');

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
}
