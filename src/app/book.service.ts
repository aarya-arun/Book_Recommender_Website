import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class BookService{

    private author = '';
    private description = '';
    private imageurl = '';
    private rating = -1;
    private ratingscount = -1;
    private title = '';
    private year = -1;


    getauthor(){

        return this.author;
    }

    

    getsdescription(){

        return this.description;
    }


    getimage(){

        return this.imageurl;
    }



    getrating(){

        return this.rating;
    }


    getratingscount(){

        return this.ratingscount;
    }

    gettitle()
    {
        return this.title;
    }

    getyear()
    {
        return this.year;
    }





    putauthor(p){

        this.author = p;
    }

    

    putdescription(p){

        this.description = p;
    }


    putimage(p){

        this.imageurl = p;
    }



    putrating(p){

        this.rating = p;
    }


    putratingscount(p){

        this.ratingscount = p;
    }

    puttitle(p)
    {
        this.title = p;
    }

    putyear(p)
    {
        this.year = p;
    }








}