import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SelectBookNewComponent } from './select-book-new/select-book-new.component';
import { SelectGenreNewComponent } from './select-genre-new/select-genre-new.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ShelvesComponent } from './book-shelves/shelves.component';
import { FriendsComponent } from './friends/friends.component';
import { BookProfileComponent } from './book-profile/book-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



const routes: Routes = [

    { path: '', component: HeaderComponent},
    { path: 'l/f/b', component: SelectBookNewComponent},
    { path: 'l/f/g', component: SelectGenreNewComponent},
    { path: 'l/homepage', component: HomepageComponent },
    { path: 'l/shelves', component: ShelvesComponent},
    { path: 'l/bookprofile', component: BookProfileComponent},
    { path: 'l/userprofile', component: UserProfileComponent},
  
];
@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}
