import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Periods } from "../home/period/period";
import { AddPeriods } from "../home/period/add-period";
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
      this.headers2.append("Content-Type", "application/json");
      this.headers2.append('Authorization', 'Basic '+btoa('bima' + ":" + 'bimateam'));
      this.opts2 = { headers : this.headers2 };
      return this.http.get(this.urlService.getUrlElligibleParticipants(id), this.opts2)
      // return this.http.get(this.urlUsers.getUrlPeriod())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   private extractData(res:Response) {
      let body = res.json();
      return body || [];
   } 
}