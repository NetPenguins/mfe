import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

/**
 * @description Local Storage Service for storing session data
 * @module services/local-storage.service
 * @version 1.0.0
 * @namespace LocalStorageService
 */
@Injectable()
export class StorageService {
  constructor(private cookieService: CookieService) {}

  get(key: string): any {
    return this.cookieService.get(key);
  }

  set(key: string, value: any): void {
    /* 
     Cookie storage is limited to 2 days by default after that the theme is defaulted to dark or user system preference.
     Once the user actively sets the theme by using the toggle this value will be set with the expiration date as defined below.
     TODO: Change the value of 2 to match the time interval you want to keep the cookie stored
      For example: 2 days = 2 * 24 * 60 * 60 * 1000
                   12 hours = 12 * 60 * 60 * 1000
                   30 minutes = 30 * 60 * 1000
     */
    this.cookieService.put(key, value, { expires: new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000))}, );
  }

}
