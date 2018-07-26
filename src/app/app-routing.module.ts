import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActHeaderComponent } from './content/actions/act-header/act-header.component';
import { ContentComponent } from './content/content.component';
import { CodeBodyComponent } from './content/code/code-body/code-body.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { PreviewComponent } from './preview/preview.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full'},
  { path: 'app', component: ContentComponent},
  { path: 'preview', component: PreviewComponent},
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/app'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
