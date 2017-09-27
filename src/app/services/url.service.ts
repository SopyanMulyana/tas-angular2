import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UrlService {
   constructor() {
   }
 
   getUrlUsers(): string {
      return "http://localhost:8080/api/all/";
   }

   getUrlEmployee(): string {
        return null;
   }

   getUrlAuth(): string {
       return "http://mtpc583:8080/api/auth/";
   }

   getUrlPeriod(): string {
       return "http://mtpc583:8080/api/secure/period/";
   }

   postPeriodData(): string {
    //    return "http://mtpc659:8080/period/create"; //wimba
        return "http://mtpc583:8080/api/secure/period/create/"
   }

   postEditPeriod(id: number): string {
       return "http://mtpc583:8080/api/secure/period/"+id+"/edit/";
   }

   deleteUrlPeriod(id:number): string {
       return "http://mtpc583:8080/api/secure/period/"+id+"/delete/";
   }

   getUrlElligibleParticipants(id:number): string {
       return "http://mtpc659:8080/eligibleparticipant/findByTraining/"+id; //wimba
   }

   postAddElligibleParticipants(): string {
       return "http://mtpc659:8080/eligibleparticipant/add/"; //wimba
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