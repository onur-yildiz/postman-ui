import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { HttpService } from '../../shared/http.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  defaultEmail = 'test@test.com';
  defaultPassword = 'test123';

  constructor(private authService: AuthService,
              private httpService: HttpService,
              private router: Router) { }

  ngOnInit() {
    if (this.router.url.includes('sign')) {
      const sidebar = document.getElementsByClassName('outlet');
      (<HTMLElement>sidebar[0]).style.width = '100%';
    }
    document.getElementById('signin-form').addEventListener('mouseover', () => {
      document.getElementById('header-container').classList.add('header-gradient');
    });
    document.getElementById('signin-form').addEventListener('mouseleave', () => {
      document.getElementById('header-container').classList.remove('header-gradient');
    });
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    new Promise<any>(
      (resolve) => {
        {
          this.authService.signinUser(email, password);
          this.authService.getToken();
        }
        resolve();
      }
    )
    .then(
      () => {
        this.httpService.getCollection();
        this.httpService.getRequests();
      }
    );
  }

  ngOnDestroy() {
    const sidebar = document.getElementsByClassName('outlet');
    (<HTMLElement>sidebar[0]).style.width = '';
    document.getElementById('header-container').classList.remove('header-gradient');
  }

}


