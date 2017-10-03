import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs/Rx';
import { ListMaintenance } from "../home/maintenance/maintenance";


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
    
     private extractData(res:Response) {
        let body = res.json();
        return body || [];
     } 
}