import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  HostListener,
  OnDestroy
} from '@angular/core';
import { RequestService } from '../shared/request.service';
import { Req } from '../shared/req.model';
import { Subscription } from '../../../node_modules/rxjs';
import { UserService } from '../shared/user.service';
import { HttpService } from '../shared/http.service';
declare const jQuery: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  tabSwitch = false;
  requests: Req[];
  requestCollection: Req[];
  filterQuery = '';

  requestSubs: Subscription;
  collectionSubs: Subscription;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this._elRef.nativeElement.style.height =
      window.innerHeight - this._elRef.nativeElement.offsetTop + 'px';
  }

  constructor(
    private _elRef: ElementRef,
    private requestService: RequestService,
    private userService: UserService,
    private httpService: HttpService
  ) {
    this.onResize();
  }

  ngOnInit() {
    this.requests = this.requestService.getRequests();
    this.requestCollection = this.requestService.getRequestCollection();
    this.requestSubs = this.requestService.requestsUpdated.subscribe(
      newRequests => {
        this.requests = newRequests;
      }
    );
    this.collectionSubs = this.requestService.requestCollectionUpdated.subscribe(
      newRequestCollection => {
        this.requestCollection = newRequestCollection;
      }
    );
  }

  ngAfterViewInit() {
    this.jQuery();
  }

  onSelectRequest(request: Req) {
    document.getElementById('code-loading').style.display = 'flex';
    this.httpService.request(request);
    this.requestService.switchTab(request, true);
  }

  onAddToCollection(request: Req) {
    this.requestService.addToCollection(request);
    this.httpService.storeCollection(request);
    this.requestService.requestCollectionUpdated.next(
      this.requestService.requestCollection.slice()
    );
  }

  onDeleteFromHistory(request: Req) {
    this.requestService.deleteRequest(request._id);
    this.httpService.deleteRequest(request._id);
  }

  onDeleteFromCollection(request: Req) {
    this.requestService.deleteCollectionRequest(request._id);
    this.httpService.deleteCollection(request._id);
  }

  jQuery() {
    const component = jQuery(this._elRef.nativeElement);
    component.find('.tabs button').click(function() {
      component.find('.tabs button:not(this)').removeClass('active-tab');
      $(this).addClass('active-tab');
    });
  }

  ngOnDestroy() {
    this.requestSubs.unsubscribe();
    this.collectionSubs.unsubscribe();
  }
}
