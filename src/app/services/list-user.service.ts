import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User1 } from "../user1";
import { ListUser } from "../home/user/list-user";
import { UrlService } from './url.service';
@Injectable()
export class ListUserService {
      
   constructor(private http: Http, private urlUsers: UrlService) {
      
   }
 
   
}