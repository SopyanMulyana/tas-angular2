import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Periods } from "../home/period/period";
import { AddPeriods } from "../home/period/add-period";
import { UrlService } from './url.service';
@Injectable()
export class PeriodService {
   constructor(private http: Http, private urlService: UrlService) {
   }
 
   getPeriods(): Observable<Periods[]> {
    let token = localStorage.getItem('token')
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Charset", "UTF-8");
    headers.append('Authorization', token);
    let opts:RequestOptionsArgs = { headers : headers };

    return this.http.get(this.urlService.getUrlPeriod(), opts)
    // return this.http.get(this.urlUsers.getUrlPeriod())
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

   public createDataPeriod(periodData: AddPeriods): Observable<boolean>{
      return this.http.post(this.urlService.postPeriodData(), periodData)
      .map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }
      
      private extractData(res:Response) {
      let body = res.json();
      return body || [];
   } 
}