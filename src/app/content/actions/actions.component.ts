import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { RequestService } from '../../shared/request.service';
import { Req } from '../../shared/req.model';
import { Subscription } from '../../../../node_modules/rxjs';
// import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit, AfterViewInit, OnDestroy {
  actPage = 'auth';
  requestAddress = '';
  requestTab: any[];

  tabSubs: Subscription;

  constructor(private _elRef: ElementRef,
              private requestService: RequestService) { }

  ngOnInit() {
    this.tabSubs = this.requestService.tabSwitched
      .subscribe(
        tabInfo => this.requestAddress = tabInfo.url
      );
  }

  ngAfterViewInit() {
    this.jQuery();
  }

  onRequest() {
    this.requestService.request(this.requestAddress);
  }

  onSave() {
    this.requestService.downloadRequested.next();
  }

  onSaveAs() {
    const dropdown = document.getElementById('save-as');
    if (dropdown) {
      setTimeout(() => {
        dropdown.click();
        dropdown.style.setProperty('background-color', 'grey', 'important');
        setTimeout(() => {
          dropdown.style.setProperty('background-color', '');
        }, 300);
      }, 0);
    }
  }

  jQuery() {
    const component = jQuery(this._elRef.nativeElement);
    component.find('.drop-btn').not('.act-auth-container .drop-btn').click(function() {
      const currentDrop = $(this).next();
       $(document).find('.dropdown-content').not('.act-auth-container .drop-btn').not(currentDrop).slideUp('fast');
       currentDrop.slideToggle('fast');
    });

    component.find('.dropdown.selectable .dropdown-content a').click(function() {
      $(this).closest('.dropdown-content').prev().html($(this).html()); // put selected elements value to the dropdown title
    });

    component.find('.actions-menu button:not(#code-generator)').click(function() {
      component.find('.actions-menu button').not(this).removeClass('active');
      $(this).addClass('active');
    });
  }

  ngOnDestroy() {
    this.tabSubs.unsubscribe();
  }

}
