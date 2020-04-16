import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';



@Component({

  selector: 'app-header',
  templateUrl: './header.component.html'


})
export class HeaderComponent{

  messageifvalid = '';

  onLogin(form: NgForm){

    if (form.value.username === 'f') {

      if (form.value.password === 'u')
      {


        this.messageifvalid = 'YAYY!';


      }
     }



    form.resetForm();



   }


   invaliddisplay()
   {
     return this.messageifvalid;
   }

}



