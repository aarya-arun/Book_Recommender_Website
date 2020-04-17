import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService{

    private username = '';
    private shelfid = -1;
    private age=-1;
    private emailid='';


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


}
