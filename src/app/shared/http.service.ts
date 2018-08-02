import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import 'rxjs';
import { map } from 'rxjs/operators';
import { Req } from './req.model';
import { RequestService } from './request.service';
import { Info } from './info.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  serverURI = 'https://glacial-springs-87925.herokuapp.com';
  initialized = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private requestService: RequestService
  ) {}

  request(request: Req, body?: string) {
    const token = this.authService.getToken();
    const startTime = new Date().getTime();

    switch (request.method) {
      case 'GET':
        return this.httpClient
          .post<Req>(`${this.serverURI}/request`, request, {
            headers: { 'x-auth': token },
            observe: 'body'
          })
          .subscribe(
            response => this.requestService.addRequest(response),
            error => {
              throw new Error('Could not get request');
            }
          );
      case 'POST':
        return this.httpClient
          .post<any>(request.url, body, {
            headers: { 'x-auth': token, 'content-type': 'application/json' },
            observe: 'response'
          })
          .subscribe(
            response => {
              if (response.body) {
                const length = JSON.stringify(response.body).length;
              }
              const responseTime = new Date().getTime() - startTime;
              const newReq = new Req(response.url, request.method);
              const newInfo = new Info(
                response.status,
                responseTime,
                length / 1000,
                JSON.stringify(response.body),
                response.url,
                null,
                response.headers
              );
              this.storeExternalRequest(newReq, newInfo);
            },
            error => console.log(error)
          );
      case 'PUT':
        return this.httpClient
          .put<any>(request.url, body, {
            headers: { 'x-auth': token, 'content-type': 'application/json' },
            observe: 'response'
          })
          .subscribe(
            response => {
              if (response.body) {
                const length = JSON.stringify(response.body).length;
              }
              const responseTime = new Date().getTime() - startTime;
              const newReq = new Req(response.url, request.method);
              const newInfo = new Info(
                response.status,
                responseTime,
                length / 1000,
                JSON.stringify(response.body),
                response.url,
                null,
                response.headers
              );
              this.storeExternalRequest(newReq, newInfo);
            },
            error => console.log(error)
          );
      case 'PATCH':
        return this.httpClient
          .patch<any>(request.url, body, {
            headers: { 'x-auth': token, 'content-type': 'application/json' },
            observe: 'response'
          })
          .subscribe(
            response => {
              if (response.body) {
                const length = JSON.stringify(response.body).length;
              }
              const responseTime = new Date().getTime() - startTime;
              const newReq = new Req(response.url, request.method);
              const newInfo = new Info(
                response.status,
                responseTime,
                length / 1000,
                JSON.stringify(response.body),
                response.url,
                null,
                response.headers
              );
              this.storeExternalRequest(newReq, newInfo);
            },
            error => console.log(error)
          );
      case 'DELETE':
        return this.httpClient
          .delete<any>(request.url, {
            headers: { 'x-auth': token, 'content-type': 'application/json' },
            observe: 'response'
          })
          .subscribe(
            response => {
              if (response.body) {
                const length = JSON.stringify(response.body).length;
              }
              const responseTime = new Date().getTime() - startTime;
              const newReq = new Req(response.url, request.method);
              const newInfo = new Info(
                response.status,
                responseTime,
                length / 1000,
                JSON.stringify(response.body),
                response.url,
                null,
                response.headers
              );
              this.storeExternalRequest(newReq, newInfo);
            },
            error => console.log(error)
          );
    }
  }

  storeExternalRequest(request: Req, info: Info) {
    const token = this.authService.getToken();

    return this.httpClient
      .post<Req>(`${this.serverURI}/request`, request, {
        headers: { 'x-auth': token }
      })
      .subscribe(
        (response: any) => {
          info._id = response.req._id;
          this.requestService.addExternalRequest(response.req, info);
        },
        error => {
          throw new Error(
            'Data is not correctly stored in database. (Request History)'
          );
        }
      );
  }

  storeRequest(request: Req) {
    const token = this.authService.getToken();

    return this.httpClient
      .post<Req>(`${this.serverURI}/request`, request, {
        headers: { 'x-auth': token }
      })
      .subscribe(
        response => {
          return response;
        },
        error => {
          throw new Error(
            'Data is not correctly stored in database. (Request History)'
          );
        }
      );
  }

  storeCollection(request: Req) {
    const token = this.authService.getToken();

    return this.httpClient
      .post<Req>(`${this.serverURI}/collection`, request, {
        headers: { 'x-auth': token }
      })
      .subscribe(
        response => {
          return response;
        },
        error => {
          throw new Error(
            'Data is not correctly stored in database. (Collection)'
          );
        }
      );
  }

  deleteRequest(id: string) {
    const token = this.authService.getToken();
    return this.httpClient
      .delete(`${this.serverURI}/request/${id}`, {
        headers: { 'x-auth': token },
        observe: 'body'
      })
      .subscribe(response => {
        console.log('DELETED', response);
      });
  }

  deleteCollection(id: string) {
    const token = this.authService.getToken();
    return this.httpClient
      .delete(`${this.serverURI}/collection/${id}`, {
        headers: { 'x-auth': token },
        observe: 'body'
      })
      .subscribe(response => {
        console.log('DELETED', response);
      });
  }

  getRequests() {
    const token = this.authService.getToken();

    return this.httpClient
      .get<Req[]>(`${this.serverURI}/requests`, {
        headers: { 'x-auth': token },
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        map(requests => {
          if (!requests) {
            requests = [];
          }
          return requests;
        })
      )
      .subscribe(
        requests => {
          this.requestService.setRequests(requests);
        },
        error => {
          console.log(error);
        }
      );
  }

  getCollection() {
    const token = this.authService.getToken();

    return this.httpClient
      .get<Req[]>(`${this.serverURI}/collections`, {
        headers: { 'x-auth': token },
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        map(requests => {
          if (!requests) {
            requests = [];
          }
          return requests;
        })
      )
      .subscribe(
        requests => {
          this.requestService.setCollection(requests);
        },
        error => {
          console.log(error);
        }
      );
  }
}
