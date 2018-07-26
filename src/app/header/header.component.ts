import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import * as $ from 'jquery';
import { AuthService } from '../shared/auth.service';
import { RequestService } from '../shared/request.service';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selection = '';

  constructor(private router: Router,
              public authService: AuthService,
              private requestService: RequestService,
              private httpService: HttpService) { }

  ngOnInit() {
    $(document).click( e => {
      if ($(e.target).closest('.signbox').length !== 0 || $(e.target).closest('.sign-btn').length !== 0) {
        return;
      }
      this.selection = '';
    });
  }

  selectBox(box: string) {
    if (this.router.url.includes('sign') && box.includes('sign')) {
      this.router.navigate(['/' + box]);
    } else {
      if (this.selection === box) {
        this.selection = '';
      } else {
        this.selection = box;
      }
    }
  }

  onLogout() {
    const saveData = new Promise<string>(
      (resolve) => {
        this.httpService.storeCollection();
        this.httpService.storeRequests();
        resolve('All data saved.');
      }
    );
    saveData
      .then((result) => {
        console.log(result);
        this.authService.logout();
      })
      .catch((error) => console.log(error));
  }

  onNewTab() {
    this.requestService.newTabRequested.next();
  }

}
