import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs/Rx';
import { ActiveTraining } from "../home/dashboard/active-training";
import { BCCSchedule } from "../home/dashboard/bcc-schedule";

@Injectable()
export class DashboardService {
    token = localStorage.getItem('token')
    headers = new Headers();
    opts: RequestOptionsArgs;

       
    constructor(private http: Http, private urlService: UrlService) {
       this.token = localStorage.getItem('token')
       this.headers.append("Content-Type", "application/json");
       this.headers.append("Charset", "UTF-8");
       this.headers.append('Authorization', this.token);
       this.opts = { headers : this.headers };
    }

    getActiveTrainingList(): Observable<ActiveTraining[]> {
        return this.http.get(this.urlService.getUrlActiveTraining(), this.opts)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

    getBCCScheduleList(): Observable<BCCSchedule[]> {
    return this.http.get(this.urlService.getUrlBCCShedule(), this.opts)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
     private extractData(res:Response) {
        let body = res.json();
        return body || [];
     } 
}