import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          this.signinUser(email, password);
        }
      )
      .catch(error => alert(error));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        () => {
          this.getToken();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 100);
        },
        (rejected) => {
          alert(rejected);
          this.router.navigate(['/']);
          this.token = null;
        }
      )
      .catch(
        error => alert(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  getUserEmail() {
    return firebase.auth().currentUser.email;
  }
}
