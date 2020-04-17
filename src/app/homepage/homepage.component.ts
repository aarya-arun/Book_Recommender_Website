import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { BookService } from '../book.service';
import { Router } from '@angular/router';


@Component({

  selector: 'app-homepage',
  templateUrl: './homepage.component.html',

})

export class HomepageComponent implements OnInit{

  constructor(private http: HttpClient, private router: Router, public userService: UserService, public bookservice:BookService) { }

  username = 'Aarya';
  formbook='';

  private author = '';
  private description = '';
  private imageurl = '';
  private rating = -1;
  private ratingscount = -1;
  private title = '';
  private year = -1;

  ngOnInit(){

    this.username = this.userService.getusername();
  }

    


    booksyoulike = ['https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg',
                  'https://images.gr-assets.com/books/1298557533m/154798.jpg',
                   'https://images.gr-assets.com/books/1347899366m/7736086.jpg',
                   'https://images.gr-assets.com/books/1388224829m/373915.jpg',
                   'https://images.gr-assets.com/books/1309211401m/6310.jpg',
                   'https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg',
                   'https://images.gr-assets.com/books/1298557533m/154798.jpg',
                   'https://images.gr-assets.com/books/1347899366m/7736086.jpg',
                   'https://images.gr-assets.com/books/1388224829m/373915.jpg',
                   'https://images.gr-assets.com/books/1309211401m/6310.jpg'];

    genresyoulike = ['https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg',
    'https://images.gr-assets.com/books/1298557533m/154798.jpg',
     'https://images.gr-assets.com/books/1347899366m/7736086.jpg',
     'https://images.gr-assets.com/books/1388224829m/373915.jpg',
     'https://images.gr-assets.com/books/1309211401m/6310.jpg',
     'https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg',
     'https://images.gr-assets.com/books/1298557533m/154798.jpg',
     'https://images.gr-assets.com/books/1347899366m/7736086.jpg',
     'https://images.gr-assets.com/books/1388224829m/373915.jpg',
     'https://images.gr-assets.com/books/1309211401m/6310.jpg'];

    whatspopular = ['https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg',
    'https://images.gr-assets.com/books/1298557533m/154798.jpg',
     'https://images.gr-assets.com/books/1347899366m/7736086.jpg',
     'https://images.gr-assets.com/books/1388224829m/373915.jpg',
     'https://images.gr-assets.com/books/1309211401m/6310.jpg',
     'https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg',
     'https://images.gr-assets.com/books/1298557533m/154798.jpg',
     'https://images.gr-assets.com/books/1347899366m/7736086.jpg',
     'https://images.gr-assets.com/books/1388224829m/373915.jpg',
     'https://images.gr-assets.com/books/1309211401m/6310.jpg'];


     getbookprofile(form: NgForm)
     {


      this.formbook = form.value.book;

      this.http.get<{

        author: string,
        description: string,
        imageurl: string,
        rating: number,
        ratingscount: number,
        title: string,
        year: number
      }>('http://localhost:5000/api/book/' + this.formbook).subscribe((bookdata) => {

        this.author=bookdata.author;
        this.description=bookdata.description;
        this.imageurl=bookdata.imageurl;
        this.rating=bookdata.rating;
        this.ratingscount=bookdata.ratingscount;
        this.title=bookdata.title;
        this.year=bookdata.year;

     
       this.bookservice.putauthor(this.author);
       this.bookservice.putdescription(this.description);
       this.bookservice.putimage(this.imageurl);
       this.bookservice.putrating(this.rating);
       this.bookservice.putratingscount(this.ratingscount);
       this.bookservice.puttitle(this.title);
       this.bookservice.putyear(this.year);
     


     });

     console.log('hiii');
     this.router.navigate(['/l/bookprofile']);




     }

}

