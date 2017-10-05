import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs/Rx';
import { ListMaintenance } from "../home/maintenance/maintenance";
import { ListAttendance } from "../home/maintenance/attendance";
import { ListEditAttendance } from "../home/maintenance/edit-attendance-get";
import { PostEditAttendance } from "../home/maintenance/edit-attendance-post";
import { ListEditAssesment } from "../home/maintenance/edit-assesment-get";
import { PostEditAssesment } from "../home/maintenance/edit-assesment-post";


@Injectable()
export class MaintenanceService {
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

    getMaintenanceList(id:number): Observable<ListMaintenance[]> {
        return this.http.get(this.urlService.getUrlMaintenancetList(id), this.opts)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }
    
     getAttendanceList(id:number): Observable<ListAttendance[]> {
        return this.http.get(this.urlService.getUrlAttendanceList(id), this.opts)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     getListPersonForAttendance(periodId: number, scheduleId: number): Observable<ListEditAttendance[]> {
        return this.http.get(this.urlService.getUrlListPersonForAttendance(periodId,scheduleId), this.opts)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     public editAttendance(periodId:number, scheduleId:number, attendanceData: PostEditAttendance[]): Observable<boolean>{
            return this.http.post(this.urlService.postUrlEditAttendance(periodId, scheduleId), attendanceData, this.opts)
            .map(this.extractData)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

      getListPersonForAssessment(periodId: number): Observable<ListEditAssesment[]> {
            return this.http.get(this.urlService.getUrlListPersonForAssessment(periodId), this.opts)
                  .map((res: Response) => res.json())
                  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
         }
      
      public editAssessment(periodId:number, assessmentData: PostEditAssesment[]): Observable<boolean>{
            return this.http.post(this.urlService.postUrlEditAssessment(periodId), assessmentData, this.opts)
            .map(this.extractData)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }
     private extractData(res:Response) {
        let body = res.json();
        return body || [];
     } 
}