import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SelectBookNewComponent } from './select-book-new/select-book-new.component';
import { SelectGenreNewComponent } from './select-genre-new/select-genre-new.component';


const routes: Routes = [

    { path: '', component: HeaderComponent},
    { path: 'l/f/b', component: SelectBookNewComponent},
    { path: 'l/f/g', component: SelectGenreNewComponent},
];
@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}
