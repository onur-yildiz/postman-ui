import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  themeFlag = false;
  // requestDataLoaded = false;
  // collectionDataLoaded = false;

  // constructor(private httpService: HttpService) {}

  // saveRequestData() {
  //   // first request and collection update is the load process from the database, so no need to save initially loaded data
  //   if (!this.requestDataLoaded) {
  //     this.requestDataLoaded = true;
  //   } else {
  //     this.httpService.storeRequests();
  //   }
  // }

  // saveCollectionData() {
  //   // first request and collection update is the load process from the database, so no need to save initially loaded data
  //   if (!this.collectionDataLoaded) {
  //     this.collectionDataLoaded = true;
  //   } else {
  //   this.httpService.storeCollection();
  //   }
  // }
}
