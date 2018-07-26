import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../shared/auth.service';
// import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit {
  page: string;

  constructor(private _elRef: ElementRef,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.checkAuth();


    // new Promise<string>(() => {
    //   $.getJSON('http://allorigins.me/get?url=' + encodeURIComponent('https://www.reddit.com/') + '&callback=?',
    //     (data) => {
    //       console.log(data);
    //     }
    //   );
    // });
    // new Promise<string>(() => {
    //   $.get('http://allorigins.me/get?url=' + encodeURIComponent('https://www.reddit.com/') + '&callback=?',
    //     (data, status, xhr) => {
    //       console.log(xhr);
    //       console.log(status);
    //       console.log(data);
    //     }
    //   );
    // });
    // $.ajax({url: 'http://allorigins.me/get?url=' + encodeURIComponent('https://www.twitch.tv/') + '&callback=?',
    //   success: result => {
    //     console.log(result);
    //   },
    //   error: error => {
    //     console.log(error)
    //   },
    //   complete: (xhr: XMLHttpRequest) => {
    //     console.log(xhr.getAllResponseHeaders().split('; ').length);
    //   }
    // });
  }

  ngAfterViewInit() {
    this.jQuery();
  }

  checkAuth() {
    if (!this.authService.isAuthenticated() && !this.router.url.includes('sign')) {
      this.router.navigate(['/signin']);
    }
  }

  jQuery() {
    const component = jQuery(this._elRef.nativeElement);
    $(document).click( e => {
      const hasDropdown = $(e.target).closest('.dropdown-content').length === 0;
      const hasDropBtn = $(e.target).closest('.drop-btn').length === 0;
      const isDropItem = $(e.target).is('.dropdown-content a');
      if (hasDropdown && hasDropBtn || isDropItem) {
        component.find('.dropdown-content').slideUp('fast');
      }
    });
  }

}
