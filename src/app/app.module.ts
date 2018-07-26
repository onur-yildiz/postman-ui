import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { ActionsComponent } from './content/actions/actions.component';
import { CodeComponent } from './content/code/code.component';
import { ActHeaderComponent } from './content/actions/act-header/act-header.component';
import { AppRoutingModule } from './app-routing.module';
import { CodeBodyComponent } from './content/code/code-body/code-body.component';
import { ActAuthorizationComponent } from './content/actions/act-authorization/act-authorization.component';
import { ActBodyComponent } from './content/actions/act-body/act-body.component';
import { ActPreRequestScriptComponent } from './content/actions/act-pre-request-script/act-pre-request-script.component';
import { ActTestsComponent } from './content/actions/act-tests/act-tests.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { CodeCookiesComponent } from './content/code/code-cookies/code-cookies.component';
import { CodeHeadersComponent } from './content/code/code-headers/code-headers.component';
import { CodeTestsComponent } from './content/code/code-tests/code-tests.component';
import { BrowserComponent } from './content/browser/browser.component';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { SettingsComponent } from './user/settings/settings.component';
import { PreviewComponent } from './preview/preview.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { HttpModule } from '../../node_modules/@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    ActionsComponent,
    CodeComponent,
    ActHeaderComponent,
    CodeBodyComponent,
    ActAuthorizationComponent,
    ActBodyComponent,
    ActPreRequestScriptComponent,
    ActTestsComponent,
    SigninComponent,
    SignupComponent,
    CodeCookiesComponent,
    CodeHeadersComponent,
    CodeTestsComponent,
    BrowserComponent,
    SettingsComponent,
    PreviewComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
