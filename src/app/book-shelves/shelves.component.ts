import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service'


@Component({

  selector: 'app-shelves',
  templateUrl: './shelves.component.html'

})

export class ShelvesComponent implements OnInit{

  constructor(public userService: UserService) {}

    username="Aarya";

    ngOnInit(){

      this.username = this.userService.getusername();
    }
    
    haveread=["https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg", 
    "https://images.gr-assets.com/books/1298557533m/154798.jpg", 
     "https://images.gr-assets.com/books/1347899366m/7736086.jpg", 
     "https://images.gr-assets.com/books/1388224829m/373915.jpg", 
     "https://images.gr-assets.com/books/1309211401m/6310.jpg",
     "https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg", 
     "https://images.gr-assets.com/books/1298557533m/154798.jpg", 
     "https://images.gr-assets.com/books/1347899366m/7736086.jpg", 
     "https://images.gr-assets.com/books/1388224829m/373915.jpg", 
     "https://images.gr-assets.com/books/1309211401m/6310.jpg"];

     wanttoread=["https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg", 
     "https://images.gr-assets.com/books/1298557533m/154798.jpg", 
      "https://images.gr-assets.com/books/1347899366m/7736086.jpg", 
      "https://images.gr-assets.com/books/1388224829m/373915.jpg", 
      "https://images.gr-assets.com/books/1309211401m/6310.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61Fr9KLeY1L.jpg", 
      "https://images.gr-assets.com/books/1298557533m/154798.jpg", 
      "https://images.gr-assets.com/books/1347899366m/7736086.jpg", 
      "https://images.gr-assets.com/books/1388224829m/373915.jpg", 
      "https://images.gr-assets.com/books/1309211401m/6310.jpg"];
}