import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';
import { RequestService } from '../../shared/request.service';
import { Req } from '../../shared/req.model';
import { Subscription } from '../../../../node_modules/rxjs';
declare var jQuery: any;

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit, AfterViewChecked, OnDestroy {
  requestTabs: Req[] = [new Req('New Tab', null, null)];
  initialized = false;
  tabAvailable = true;
  startIndex = 0;
  indicesOfDeleted: number[] = [];

  requestSubs: Subscription;
  tabSubs: Subscription;

  constructor(
    private requestService: RequestService,
    private _elRef: ElementRef
  ) {}

  ngOnInit() {
    this.requestSubs = this.requestService.requestsUpdated.subscribe(
      newRequests => {
        if (!this.initialized) {
          this.startIndex = newRequests.length;
          this.initialized = true;
        } else {
          this.requestTabs = newRequests.slice(this.startIndex);
          this.tabAvailable = false;
          this.jQueryNewTab();
        }
      }
    );
    this.tabSubs = this.requestService.newTabRequested.subscribe(() => {
      if (!this.tabAvailable) {
        this.onNewTab();
      } else {
        this.jQueryTabHighlight();
      }
    });
  }

  ngAfterViewChecked() {
    this.jQuery();
  }

  onSwitchTab(tabReq: Req) {
    this.requestService.switchTab(tabReq);
  }

  onNewTab() {
    this.requestTabs.push(new Req('New Tab', ''));
    this.tabAvailable = true;
    this.jQueryNewTab();
  }

  onDeleteTab(requestTab: Req) {
    if (requestTab.url === 'New Tab') {
      this.tabAvailable = false;
    }
    const index = this.requestTabs.indexOf(requestTab);
    this.indicesOfDeleted.push(index);
  }

  jQuery() {
    const component = jQuery(this._elRef.nativeElement);
    component.find('.tab').click(function() {
      component
        .find('.tab')
        .not(this)
        .removeClass('active');
      $(this).addClass('active');
    });
  }

  jQueryNewTab() {
    const component = jQuery(this._elRef.nativeElement);
    component.find('.tab').removeClass('active');
    setTimeout(() => {
      component
        .find('.tab')
        .last()
        .addClass('active');
    }, 50);
  }

  jQueryTabHighlight() {
    const component = jQuery(this._elRef.nativeElement);
    const interval = setInterval(() => {
      component
        .find('.tab')
        .last()
        .toggleClass('highlight');
    }, 150);
    setTimeout(() => {
      clearInterval(interval);
    }, 600); /* blink 2 times */
  }

  ngOnDestroy() {
    this.requestSubs.unsubscribe();
    this.tabSubs.unsubscribe();
  }
}
