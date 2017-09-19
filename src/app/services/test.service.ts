import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User1 } from "../user1";
import { ListUser } from "../home/user/list-user";
@Injectable()
export class TestService {
   constructor(private http: Http) {
   }
 
   getUsers(): Observable<ListUser[]> {
      return this.http.get("http://localhost:8080/api/all")
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }
}