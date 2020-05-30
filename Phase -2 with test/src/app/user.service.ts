import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class UserService{

    constructor(private http: HttpClient) { }

    private username = '';
    private shelfid = -1;
    private age = -1;
    private emailid = '';


    private popularbooks = [];
    private topfifteen = [];
    private topfive = [];




    getusername(){

        return this.username;
    }



    getshelfid(){

        return this.shelfid;
    }


    getemailid(){

        return this.emailid;
    }



    getage(){

        return this.age;
    }




    putusername(uname){

        this.username = uname;
    }

    putshelfid(shelfid){

        this.shelfid = shelfid;
    }

    putage(age){

        this.age = age;
    }


    putemailid(emailid){

        this.emailid = emailid;
    }



    putpopular()
    {
        this.http.get<[]>('http://localhost:5000/api/books/pop/' + this.username).subscribe((popdata) => {

        this.popularbooks = popdata;

        });

    }



    puttopfive()
    {
        this.http.get<[]>('http://localhost:5000/api/books/topfiverecs/' + this.username).subscribe((popdata) => {

        this.topfive = popdata;

        });

    }


    puttopfifteen()
    {
        this.http.get<[]>('http://localhost:5000/api/books/topfifteenrecs/' + this.username).subscribe((popdata) => {

        this.topfifteen = popdata;

        });

    }


    getpopular()
    {
        return this.popularbooks;
    }


    gettopfive()
    {
        return this.topfive;
    }

    gettopfifteen()
    {
        return this.topfifteen;
    }


 

}
