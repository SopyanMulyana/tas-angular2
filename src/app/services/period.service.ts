import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Periods } from "../home/period/period";
import { AddPeriods } from "../home/period/add-period";
import { ListForEligibleParticipants } from "../home/period/eligibleparticipants/user-for-eligible";
import { AddUserForEligible } from "../home/period/eligibleparticipants/add-user-for-eligible";
import { UrlService } from './url.service';
@Injectable()
export class PeriodService {
   token = localStorage.getItem('token')
   headers = new Headers();
   opts: RequestOptionsArgs;

//    dummy
   headers2 = new Headers();
   opts2: RequestOptionsArgs;
      
   constructor(private http: Http, private urlService: UrlService) {
      this.token = localStorage.getItem('token')
      this.headers.append("Content-Type", "application/json");
      this.headers.append("Charset", "UTF-8");
      this.headers.append('Authorization', this.token);
      this.opts = { headers : this.headers };
   }
   
   getPeriods(): Observable<Periods[]> {

    return this.http.get(this.urlService.getUrlPeriod(), this.opts)
    // return this.http.get(this.urlUsers.getUrlPeriod())
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   getPeriodById(id:number): Observable<Periods> {
      return this.http.get(this.urlService.getUrlPeriod()+id, this.opts)
      // return this.http.get(this.urlUsers.getUrlPeriod())
           .map((res: Response) => res.json())
           .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   public createDataPeriod(periodData: AddPeriods): Observable<boolean>{
      return this.http.post(this.urlService.postPeriodData(), periodData, this.opts)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   public editDataPeriod(id: number, periodData: AddPeriods): Observable<boolean>{
      return this.http.post(this.urlService.postEditPeriod(id), periodData, this.opts)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   public deleteDataPeriod(id: number): Observable<boolean>{
      return this.http.delete(this.urlService.deleteUrlPeriod(id), this.opts)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   getElligibleParticipants(id:number): Observable<Periods[]> {
      return this.http.get(this.urlService.getUrlElligibleParticipants(id), this.opts)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   getListForElligibleParticipants(id:number): Observable<ListForEligibleParticipants[]> {
      return this.http.get(this.urlService.getUrlListUserForElligibleParticipants(id), this.opts)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   public addElligibleParticipants(idTraining:number, idUser:AddUserForEligible[]): Observable<boolean>{
      return this.http.post(this.urlService.postElligibleParticipant(idTraining), idUser, this.opts)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   public deleteElligibleParticipants(id: number, participantsId:number): Observable<boolean>{
      return this.http.delete(this.urlService.deleteUrlElligibleParticipant(id, participantsId) ,this.opts)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   getCourseList(id:number): Observable<ListForEligibleParticipants[]> {
      return this.http.get(this.urlService.getUrlCourseList(id), this.opts)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   private extractData(res:Response) {
      let body = res.json();
      return body || [];
   } 
}