import { Component, OnInit, AfterViewChecked } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './shared/auth.service';
import { Router, RouterEvent } from '../../node_modules/@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAnsh9UhQmXZv_cqGvbDwtt6hnYJzJtJ2o',
      authDomain: 'my-project-1526242688778.firebaseapp.com'
    });
    this.checkAuth();
    this.router.events.subscribe((routerEvent: RouterEvent) => {
      if (routerEvent.url && routerEvent.url.includes('sign')) {
        $('app-sidebar').css('display', 'none');
      } else {
        $('app-sidebar').css('display', '');
      }
    });
  }

  checkAuth() {
    setInterval(() => {
      if (!this.authService.isAuthenticated() && !this.router.url.includes('sign')) {
        this.router.navigate(['/signin']);
      }
    }, 10000);
  }
}
