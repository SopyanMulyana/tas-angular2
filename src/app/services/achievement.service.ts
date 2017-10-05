import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs/Rx';
import { ListAchievement } from "../home/achievement/achievement";
import { PostAchievement } from "../home/achievement/achievement-post";


@Injectable()
export class AchievementService {
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

    getAchievementList(idRole:number): Observable<ListAchievement[]> {
        return this.http.get(this.urlService.getUrlAchievementList(idRole), this.opts)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     public editAchievement(id: number, achievement: PostAchievement[]): Observable<boolean>{
        return this.http.post(this.urlService.postUrlEditAchievement(id),achievement, this.opts)
        .map(this.extractData)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }
    
     private extractData(res:Response) {
        let body = res.json();
        return body || [];
     } 
}