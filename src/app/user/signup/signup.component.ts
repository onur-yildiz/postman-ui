import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.router.url.includes('sign')) {
      const sidebar = document.getElementsByClassName('outlet');
      (<HTMLElement>sidebar[0]).style.width = '100%';
    }
    document.getElementById('signup-form').addEventListener('mouseover', () => {
      document.getElementById('header-container').classList.add('header-gradient');
    });
    document.getElementById('signup-form').addEventListener('mouseleave', () => {
      document.getElementById('header-container').classList.remove('header-gradient');
    });
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
  }

  ngOnDestroy() {
    const sidebar = document.getElementsByClassName('outlet');
    (<HTMLElement>sidebar[0]).style.width = '';
    document.getElementById('header-container').classList.remove('header-gradient');
  }

}
