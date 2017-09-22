import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UrlService {
   constructor() {
   }
 
   getUrlUsers(): string {
      return "http://localhost:8080/api/all";
   }

   getUrlEmployee(): string {
        return null;
   }

   getUrlAuth(): string {
       return "http://mtpc583:8080/api/auth/";
   }

   getUrlPeriod(): string {
       return "http://mtpc583:8080/api/secure/period";
    //    return "http://mtpc583:8080/api/period/";
   }

   getUrlActiveTraining(): string {
       return null;
   }

   getUrlBCCShedule(): string {
       return null;
   }

   getUrlEnrollment(): string {
       return null;
   }

   getUrlAchievement(): string {
       return null;
   }
}