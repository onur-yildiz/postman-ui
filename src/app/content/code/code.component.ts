import { Component, OnInit, AfterViewInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Info } from '../../shared/info.model';
import { RequestService } from '../../shared/request.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { UserService } from '../../shared/user.service';
declare var jQuery: any;

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, AfterViewInit, OnDestroy {
  codePage = '';
  requestInfo: Info = null;
  pageIsActive = false;
  screenHeight: number;

  requestSubs: Subscription;
  tabSubs: Subscription;

  constructor(private _elRef: ElementRef,
              private requestService: RequestService) {}

  ngOnInit() {
    this.requestSubs = this.requestService.requestInfoSet
      .subscribe(
        newRequestInfo => {
          this.requestInfo = newRequestInfo;
          this.codePage = 'body';
          document.getElementById('code-loading').style.display = 'none';
          this.pageIsActive = true;
        }
      );
    this.tabSubs = this.requestService.tabSwitched
      .subscribe(
        tabInfo => this.requestInfo = tabInfo
      );
  }

  ngAfterViewInit() {
    const component = jQuery(this._elRef.nativeElement);
    component.find('.code-menu button').click(function() {
      component.find('.code-menu button').not(this).removeClass('active');
      $(this).addClass('active');
    });
  }

  ngOnDestroy() {
    this.requestSubs.unsubscribe();
    this.tabSubs.unsubscribe();
  }

}
