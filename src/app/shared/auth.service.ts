import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders
} from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  currentUser = '';
  serverURI = 'https://glacial-springs-87925.herokuapp.com';

  constructor(private router: Router, private httpClient: HttpClient) {}

  signupUser(email: string, password: string) {
    this.httpClient
      .post<any>(
        `${this.serverURI}/users`,
        {
          email,
          password
        },
        {
          observe: 'response'
        }
      )
      .subscribe(
        response => {
          this.token = response.headers.get('x-auth');
          this.currentUser = email;
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
  }

  signinUser(email: string, password: string, callback) {
    this.httpClient
      .post<any>(
        `${this.serverURI}/users/login`,
        {
          email,
          password
        },
        {
          observe: 'response'
        }
      )
      .subscribe(
        response => {
          this.token = response.headers.get('x-auth');
          this.currentUser = email;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 100);
          callback();
        },
        error => {
          alert(error);
          this.router.navigate(['/']);
        }
      );
  }

  logout() {
    this.httpClient
      .post<any>(`${this.serverURI}/users/logout`, null, {
        headers: { 'x-auth': this.token }
      })
      .subscribe(() => {
        this.token = null;
        this.router.navigate(['/signin']);
      });
  }

  getToken() {
    if (this.isAuthenticated) {
      return this.token;
    }
  }

  isAuthenticated() {
    return this.token != null;
  }

  getUserEmail() {
    return this.currentUser;
  }
}
