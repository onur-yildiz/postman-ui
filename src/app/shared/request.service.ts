import { Injectable } from '@angular/core';
import { Req } from './req.model';
import { Subject } from '../../../node_modules/rxjs';
import { Info } from './info.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requests: Req[] = [];
  requestCollection: Req[] = [];
  sessionInfos: Info[] = [];
  reqInfo: Info;
  requestsUpdated = new Subject<Req[]>();
  requestCollectionUpdated = new Subject<Req[]>();
  requestInfoSet = new Subject<Info>();
  newTabRequested = new Subject<Req>();
  tabSwitched = new Subject<Info>();
  downloadRequested = new Subject<any>();

  constructor() {}

  request(address: string) {
    document.getElementById('code-loading').style.display = 'flex';
    $.getJSON('https://allorigins.me/get?url=' + encodeURIComponent(address) + '&callback=?',
      (data) => {
        if (!data.status.url) { alert('Bad URL'); return; }
        const request = new Req(data.status.url);
        this.reqInfo = new Info(data.contents,
                        data.status.content_type,
                        data.status.content_length,
                        data.status.http_code,
                        data.status.response_time,
                        data.status.url,
                        request.id);
        this.sessionInfos.push(this.reqInfo);
        this.requestInfoSet.next(this.reqInfo);
        this.requests.push(request);
        this.requestsUpdated.next(this.requests.slice());
      }
    );
  }

  switchTab(tabReq: Req, fromHistory?: boolean) {
    if (tabReq.url === 'New Tab') {
      this.tabSwitched.next(new Info('', '', '', null, null, '', ''));
    } else if (fromHistory) {
      this.tabSwitched.next(new Info('', '', '', null, null, tabReq.url, ''));
    } else {
      const index = this.sessionInfos.findIndex(info => info.id === tabReq.id);
      this.tabSwitched.next(this.sessionInfos[index]);
    }
  }

  getRequest(id: string) {
    const index = this.requests.findIndex(req => req.id === id);
    return this.requests[index];
  }

  deleteRequest(id: string) {
    const index = this.requests.findIndex(req => req.id === id);
    this.requests.splice(index, 1);
    this.requestsUpdated.next(this.requests.slice());
  }

  deleteCollectionRequest(id: string) {
    const index = this.requestCollection.findIndex(req => req.id === id);
    this.requestCollection.splice(index, 1);
    this.requestCollectionUpdated.next(this.requestCollection.slice());
  }

  getRequests() {
    return this.requests.slice();
  }

  getCollection() {
    return this.requestCollection.slice();
  }

  getRequestCollection() {
    return this.requestCollection.slice();
  }

  addToCollection(request: Req) {
    this.requestCollection.push(request);
    this.requestCollectionUpdated.next(this.requestCollection.slice());
  }

  // por HTTP SERVICIO
  setRequests(requests: Req[]) {
    this.requests = requests;
    this.requestsUpdated.next(this.requests.slice());
  }

  setCollection(requests: Req[]) {
    this.requestCollection = requests;
    this.requestCollectionUpdated.next(this.requestCollection.slice());
  }
  // ---

}
// OBTENER COLECCIONAS DESDE HTTP SERVICIO
