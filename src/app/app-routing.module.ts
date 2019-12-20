import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenComponent } from './components/screen/screen.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ProjectComponent } from './about/about/project/project.component';
import { UsComponent } from './about/about/us/us.component';
import { AboutComponent } from './about/about/about.component';
import { ModalConfirmComponent } from './modals/modal-confirm/modal-confirm.component';
import { ModalConfirmDeleteComponent } from './modals/modal-confirm-delete/modal-confirm-delete.component';
import { UserComponent } from './about/about/us/user/user.component';




const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: ScreenComponent,
    children: [
      { path: 'modal-post', component: ModalConfirmComponent },
      { path: 'confirm', component: ModalConfirmDeleteComponent },
    ]
  },
  {
    path: 'about', component: AboutComponent,
    children: [
      { path: '', component: ProjectComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'us', component: UsComponent },
      { path: 'us/:id', component: UserComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }