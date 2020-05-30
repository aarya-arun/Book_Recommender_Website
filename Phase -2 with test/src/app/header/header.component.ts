import { Component, ɵɵcontainerRefreshEnd } from '@angular/core';
import { NgForm, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { SelectGenreNewComponent } from '../select-genre-new/select-genre-new.component';



@Component({

  selector: 'app-header',
  templateUrl: './header.component.html'


})
export class HeaderComponent{

  constructor(private router: Router, private http: HttpClient, public userService: UserService) {}

  messageifvalid = '';
  messageifvalids = '';

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
  userdataz = {};

  onLogin(form: NgForm){

    this.formusn = form.value.username;
    this.formpwd = form.value.password;

    this.http.get<{

        username: string,
        password: string,
        emailid: string,
        age: number,
        shelfid: number

     }>('http://localhost:5000/api/users/' + this.formusn).subscribe((userdata) => {

     this.username = userdata.username;
     this.password = userdata.password;
     this.emailid  = userdata.emailid;
     this.age = userdata.age;
     this.shelfid = userdata.shelfid;

     if (userdata.age < 0)
     {

       this.router.navigate(['']);
       this.messageifvalid = 'This user does not exist.';



       form.resetForm();
     }
     else
     {
            if (this.password.localeCompare(this.formpwd) !== 0)
             {

              this.messageifvalid = 'Please enter a valid username-password combination.';

              this.router.navigate(['']);

              form.resetForm();

             }
            else
            {
            this.userService.putusername(this.username);
            this.userService.putshelfid(this.shelfid);
            this.userService.putage(this.age);
            this.userService.putemailid(this.emailid);

            this.userService.puttopfifteen();
            this.userService.puttopfive();
            this.userService.putpopular();
            


              
            this.router.navigate(['/l/userprofile']);




             }







      }


     });








  }













invaliddisplay()
{

     return this.messageifvalid;
   }

invaliddisplays()
{

     return this.messageifvalids;
   }



















onSignUp(form: NgForm)
{

    this.nextformusn = form.value.username;
    this.nextformpwd = form.value.password;
    this.nextformemail = form.value.emailid;
    this.nextformage = form.value.age;




    this.userdataz = {

        // tslint:disable-next-line: object-literal-key-quotes
        'username': this.nextformusn,
        // tslint:disable-next-line: object-literal-key-quotes
        'password': this.nextformpwd,
        // tslint:disable-next-line: object-literal-key-quotes
        'emailid': this.nextformemail,
        // tslint:disable-next-line: object-literal-key-quotes
        'age': this.nextformage

      };



    this.http.put<{message: string}>('http://localhost:5000/api/addnewuser', this.userdataz).subscribe((newuserdata) => {

        console.log(newuserdata.message);

        if (newuserdata.message.localeCompare('All good.') !== 0)
        {

          this.messageifvalids = newuserdata.message;
          this.router.navigate(['']);
          form.resetForm();
          console.log(newuserdata.message);
        }
        else
        {

        this.userService.putusername(this.nextformusn);
        this.userService.putemailid(this.nextformemail);
        this.userService.putage(this.nextformage);

        const la = {};


        this.http.post<{message: string}>('http://localhost:5000/api/books/pop/' + this.nextformusn, la).subscribe((neuserdata) => {


          if (newuserdata.message.localeCompare('All good.') !== 0)
          {

            console.log('Never gonna happen');
          }
          else
          {
            this.userService.putpopular();
            this.router.navigate(['/l/f/b']);

          }


        });

      }






       });









    }






}



