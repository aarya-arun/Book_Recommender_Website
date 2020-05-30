import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class BookService{

    private isbn = '';
    private booktitle = '';
    private author = '';
    private publishdate = -1;
    private ratingcount = -1;
    private rating = -1;
    private desc = '';
    private image = '';


    getisbn(){

        return this.isbn;
    }


    getbooktitle(){

        return this.booktitle;
    }



    getauthor(){

        return this.author;
    }


    getpublishdate(){

        return this.publishdate;
    }



    getratingcount(){

        return this.ratingcount;
    }


    getrating(){

        return this.rating;
    }

    getdesc(){

        return this.desc;
    }

    getimage(){

        return this.image;
    }



    putisbn(isbn){

        this.isbn = isbn;
    }


    putbooktitle(booktitle){

        this.booktitle = booktitle;
    }



    putauthor(author){

        this.author = author;
    }


    putpublishdate(publishdate){

        this.publishdate = publishdate;
    }



    putratingcount(ratingcount){

        this.ratingcount = ratingcount;
    }


    putrating(rating){

        this.rating = rating;
    }

    putdesc(desc){

        this.desc = desc;
    }

    putimage(image){

        this.image = image;
    }

}
