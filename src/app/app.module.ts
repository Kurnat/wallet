import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { HeaderComponent } from './components/header/header.component';
import { ScreenComponent } from './components/screen/screen.component';
import { ModalConfirmComponent } from './modals/modal-confirm/modal-confirm.component';
import { ModalConfirmDeleteComponent } from './modals/modal-confirm-delete/modal-confirm-delete.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectComponent } from './about/about/project/project.component';
import { UsComponent } from './about/about/us/us.component';
import { SearchPostComponent } from './components/search-post/search-post.component';
import { SearchTextPipe } from './core/pipes/search-text.pipe';
import { RadioSearchPipe } from './core/pipes/radio-search.pipe';
import { AboutComponent } from './about/about/about.component';
import { UserComponent } from './about/about/us/user/user.component';
import {  ModalForUserComponent } from './modals/modal-for-user/modal-for-user.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HeaderComponent,
    ScreenComponent,
    SearchTextPipe,
    RadioSearchPipe,
    ModalConfirmComponent,
    ModalConfirmDeleteComponent,
    PageNotFoundComponent,
    ProjectComponent,
    UsComponent,
    SearchPostComponent,
    AboutComponent,
    UserComponent,
    ModalForUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  entryComponents:[
    ModalConfirmComponent,
    ModalConfirmDeleteComponent,
    ModalForUserComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
