import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Employee } from "../home/user/employee";
import { UrlService } from './url.service';
@Injectable()
export class EmployeeService {
   constructor(private http: Http, private urlUsers: UrlService) {
   }
 
//    getEmployees(): Observable<Employee[]> {
//       return this.http.get(this.urlUsers.getUrlEmployee())
//          .map((res: Response) => res.json())
//          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
//    }
}