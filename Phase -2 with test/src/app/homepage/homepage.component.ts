import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { BookService } from '../book.service';
import { Router } from '@angular/router';



@Component({

  selector: 'app-homepage',
  templateUrl: './homepage.component.html',

})

export class HomepageComponent implements OnInit{

  constructor(private http: HttpClient, private router: Router, public userService: UserService, public bookService: BookService) { }

  username = 'Aarya';

  author = '';
  description = '';
  imageurl = '';
  rating = -1;
  ratingscount = -1;
  title = '';
  year = -1;
  top15 = [];
  top5 = [];
  popular = [];

  ngOnInit(){

    this.username = this.userService.getusername();

    this.booksyoulike();
    this.genresyoulike();
    this.whatspopular();

    console.log(this.popular);


  }



    booksyoulike()
    {
      this.top15 = this.userService.gettopfifteen();
      const hakuna = ['', ''];
      const diff = 45 - this.top15.length;
      if (diff > 0)
    {
        for (let i = 0; i < diff; i++) {
            this.top15.push(hakuna);
    }
    }



    }


    genresyoulike(){
      this.top5 = this.userService.gettopfive();
      const hakuna = ['', ''];
      const diff = 45 - this.top5.length;
      if (diff > 0)
    {
        for (let i = 0; i < diff; i++) {
            this.top5.push(hakuna);
    }
    }

    }

    whatspopular(){
      this.popular = this.userService.getpopular();
      const hakuna = ['', ''];
      const diff = 45 - this.popular.length;
      if (diff > 0)
    {
        for (let i = 0; i < diff; i++) {
            this.popular.push(hakuna);
    }
    }

    }


    getgenredetails(p)
    {

                   const isbn = this.top5[p][0];

                   this.http.get<{authors: string,
                    description: string,
                    imageurl: string,
                    rating: number,
                    ratingcount: number,
                    title: string,
                    year: number}>('http://localhost:5000/api/books/"' + isbn + '"').subscribe((nerespdata) => {

                                           this.bookService.putisbn(isbn);
                                           this.bookService.putbooktitle(nerespdata.title);
                                           this.bookService.putauthor(nerespdata.authors);
                                           this.bookService.putpublishdate(nerespdata.year);
                                           this.bookService.putratingcount(nerespdata.ratingcount);
                                           this.bookService.putrating(nerespdata.rating);
                                           this.bookService.putdesc(nerespdata.description);
                                           this.bookService.putimage(nerespdata.imageurl);

                                           this.router.navigate(['/l/bookprofile']);




                  });
               }

               getbookdetails(p)
                      {

                          const isbn = this.top15[p][0];
                          console.log(isbn);

                          this.http.get<{authors: string,
        description: string,
        imageurl: string,
        rating: number,
        ratingcount: number,
        title: string,
        year: number}>('http://localhost:5000/api/books/"' + isbn + '"').subscribe((nerespdata) => {

                               this.bookService.putisbn(isbn);
                               this.bookService.putbooktitle(nerespdata.title);
                               this.bookService.putauthor(nerespdata.authors);
                               this.bookService.putpublishdate(nerespdata.year);
                               this.bookService.putratingcount(nerespdata.ratingcount);
                               this.bookService.putrating(nerespdata.rating);
                               this.bookService.putdesc(nerespdata.description);
                               this.bookService.putimage(nerespdata.imageurl);

                               this.router.navigate(['/l/bookprofile']);






                         });
                      }


                getpopulardetails(p)
                 {

                     const isbn = this.popular[p][0];

                     this.http.get<{authors: string,
                      description: string,
                      imageurl: string,
                      rating: number,
                      ratingcount: number,
                      title: string,
                      year: number}>('http://localhost:5000/api/books/"' + isbn + '"').subscribe((nerespdata) => {

                                             this.bookService.putisbn(isbn);
                                             this.bookService.putbooktitle(nerespdata.title);
                                             this.bookService.putauthor(nerespdata.authors);
                                             this.bookService.putpublishdate(nerespdata.year);
                                             this.bookService.putratingcount(nerespdata.ratingcount);
                                             this.bookService.putrating(nerespdata.rating);
                                             this.bookService.putdesc(nerespdata.description);
                                             this.bookService.putimage(nerespdata.imageurl);

                                             this.router.navigate(['/l/bookprofile']);







                    });
                 }


}
