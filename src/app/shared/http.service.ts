import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import 'rxjs';
import { map } from 'rxjs/operators';
import { Req } from './req.model';
import { RequestService } from './request.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  dbURI = 'https://my-project-1526242688778.firebaseio.com/';
  dbUsersURI = this.dbURI + 'users/';
  initialized = false;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private requestService: RequestService) {}

  getEmail() {
    const email = this.authService.getUserEmail().split('@'); /* test >@< test.com */
    return email[0] + '@' + email[1].split('.').join('dot'); /* test + test >.< com ==> test + @ + testdotcom */
  }

  storeRequests() {
    const token = this.authService.getToken();
    const userFile = this.getEmail();
    const data = this.requestService.getRequests();
    const uri = this.dbUsersURI + userFile + '/requests.json?auth=' + token;

    return this.httpClient.put<Req[]>(encodeURI(uri), data)
      .subscribe(
        response => {
          console.log('Request history saved.');
        },
        error => {
          throw new Error('Data is not correctly stored in database. (Request History)');
        }
      );
  }

  storeCollection() {
    const token = this.authService.getToken();
    const userFile = this.getEmail();
    const data = this.requestService.getCollection();
    const uri = this.dbUsersURI + userFile + '/collection.json?auth=' + token;

    return this.httpClient.put<Req[]>(encodeURI(uri), data)
      .subscribe(
        response => {
          console.log('Collection saved.');
        },
        error => {
          throw new Error('Data is not correctly stored in database. (Collection)');
        }
      );
  }

  getRequests() {
    const token = this.authService.getToken();
    const userFile = this.getEmail();
    const uri = this.dbUsersURI + userFile + '/requests.json?auth=' + token;

    return this.httpClient.get<Req[]>(encodeURI(uri), {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        requests => {
          if (!requests) {requests = []; }
          for (const request of requests) {
            if (!request['date']) {
              request['date'] = new Date(0, 0, 0);
            }
          }
          return requests;
        }
      ))
      .subscribe(
        requests => {
          this.requestService.setRequests(requests);
        },
        error => {
          console.log('zzzz', error);
          setTimeout(() => {
            this.getRequests();
          }, 1000);
        }
      );
  }

  getCollection() {
    const token = this.authService.getToken();
    const userFile = this.getEmail();
    const uri = this.dbUsersURI + userFile + '/collection.json?auth=' + token;

    return this.httpClient.get<Req[]>(encodeURI(uri), {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        requests => {
          if (!requests) {requests = []; }
          for (const request of requests) {
            if (!request['date']) {
              request['date'] = new Date(0, 0, 0);
            }
          }
          return requests;
        }
      ))
      .subscribe(
        requests => {
          this.requestService.setCollection(requests);
        },
        error => {
          console.log(error);
          setTimeout(() => {
            this.getCollection();
          }, 1000);
        }
      );
  }


}
