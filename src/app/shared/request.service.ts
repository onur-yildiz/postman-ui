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
  requestBodyUpdated = new Subject<any>();

  constructor() {}

  switchTab(tabReq: Req, fromHistory?: boolean) {
    if (tabReq.url === 'New Tab') {
      this.tabSwitched.next(new Info(null, null, null, '', '', '', null));
    } else if (fromHistory) {
      this.tabSwitched.next(
        new Info(null, null, null, '', tabReq.url, '', null)
      );
    } else {
      const index = this.sessionInfos.findIndex(
        info => info._id === tabReq._id
      );
      this.tabSwitched.next(this.sessionInfos[index]);
    }
  }

  getRequest(id: string) {
    const index = this.requests.findIndex(req => req._id === id);
    return this.requests[index];
  }

  deleteRequest(id: string) {
    const index = this.requests.findIndex(req => req._id === id);
    this.requests.splice(index, 1);
    this.requestsUpdated.next(this.requests.slice());
  }

  deleteCollectionRequest(id: string) {
    const index = this.requestCollection.findIndex(req => req._id === id);
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

  addRequest(response: any) {
    if (!response) {
      return this.requestInfoSet.next(
        new Info(null, null, null, null, null, null, null)
      );
    }
    if (response.req && response.info) {
      const request: Req = response.req;
      const requestInfo: Info = response.info;
      requestInfo._id = request._id;
      try {
        this.sessionInfos.push(requestInfo);
        this.requestInfoSet.next(requestInfo);
        this.requests.push(request);
        this.requestsUpdated.next(this.requests.slice());
      } catch (error) {
        console.log('ADDREQUEST', error);
      }
    }
  }

  addExternalRequest(request: Req, info: Info) {
    this.sessionInfos.push(info);
    this.requestInfoSet.next(info);
    this.requests.push(request);
    this.requestsUpdated.next(this.requests.slice());
  }

  setRequests(requests: Req[]) {
    this.requests = requests;
    this.requestsUpdated.next(this.requests.slice());
  }

  setCollection(requests: Req[]) {
    this.requestCollection = requests;
    this.requestCollectionUpdated.next(this.requestCollection.slice());
  }
}
