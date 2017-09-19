import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User1 } from "../user1";
import { ListUser } from "../home/user/list-user";
import { UrlService } from './url.service';
@Injectable()
export class ListUserService {
   constructor(private http: Http, private urlUsers: UrlService) {
   }
 
   getUsers(): Observable<ListUser[]> {
      return this.http.get(this.urlUsers.getUrlUsers())
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }
}