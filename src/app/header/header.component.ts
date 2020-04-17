import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';



@Component({

  selector: 'app-header',
  templateUrl: './header.component.html'


})
export class HeaderComponent{

  constructor(private router: Router, private http: HttpClient, public userService: UserService) {}

  messageifvalid = '';

  username = 'hi';
  password = 'hi';
  emailid = 'hi';
  age = -1;
  shelfid = -5;
  formusn = 'hi';
  formpwd = 'hi';

  nextformusn = '';
  nextformpwd = '';
  nextformemail = '';
  nextformage = -1;


  userdata = {};

  onLogin(form: NgForm){

    this.formusn = form.value.username;
    this.formpwd = form.value.password;

    this.http.get<{

        username: string,
        password: string,
        emailid: string,
        age: number,
        shelfid: number

     }>('http://localhost:5000/api/' + this.formusn).subscribe((userdata) => {

     this.username = userdata.username;
     this.password = userdata.password;
     this.emailid  = userdata.emailid;
     this.age = userdata.age;
     this.shelfid = userdata.shelfid;
     


     });

    this.validashunz();

    form.resetForm();

     }

    validashunz()
    {// tslint:disable-next-line: triple-equals
    if (this.age < 0 || this.password.localeCompare(this.formpwd) != 0)
    {

        this.messageifvalid = 'Please enter a valid username-password combination';
        this.router.navigate(['']);

     }
     else
     { 
      this.userService.putusername(this.username);
      this.userService.putshelfid(this.shelfid);
      this.userService.putage(this.age);
      this.userService.putemailid(this.emailid);
      
      this.router.navigate(['/l/homepage']);


     }


   



  }








   invaliddisplay()
   {

     return this.messageifvalid;
   }







   onSignUp(form: NgForm){

    this.nextformusn = form.value.username;
    this.nextformpwd = form.value.password;
    this.nextformemail = form.value.emailid;
    this.nextformage = form.value.age;
    


    this.http.get<{

      username: string,
      password: string,
      emailid: string,
      age: number,
      shelfid: number

   }>('http://localhost:5000/api/' + this.nextformusn).subscribe((userdata) => {

   this.username = userdata.username;
   this.age=userdata.age;
   
   

   });
    


    // tslint:disable-next-line: triple-equals
    if (this.age < 0)
    {

      this.userdata = {

        // tslint:disable-next-line: object-literal-key-quotes
        "username": this.nextformusn,
        // tslint:disable-next-line: object-literal-key-quotes
        "password": this.nextformpwd,
        // tslint:disable-next-line: object-literal-key-quotes
        "emailid": this.nextformemail,
        // tslint:disable-next-line: object-literal-key-quotes
        "age": this.nextformage

      };

      this.http.put<{message: string}>('http://localhost:5000/api/addnewuser', this.userdata).subscribe((newuserdata) => {
        
        this.userService.putusername(this.nextformusn);
        this.userService.putemailid(this.nextformemail);
        this.userService.putage(this.nextformage);
        
        this.router.navigate(['/l/f/b']);

       
       
       
    
       });

      
     

      




    }



   }

}



