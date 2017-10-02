import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { ListUser } from "../home/user/list-user";
import { UrlService } from './url.service';
import { Observable } from 'rxjs/Rx';
import { User } from '../user';
import { AddUsers } from "../home/user/add-user";
import { ListGrade } from "../home/user/grade";
import { ListLocation } from "../home/user/location";
import { AddActive } from "../home/user/edit-active";
import { AddRole } from "../home/user/edit-roles";

@Injectable()
export class UserService {
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

    getAll() {
        return this.http.get('/api/users', this.jwt()).subscribe((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).subscribe((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
    getTrainerList(): Observable<ListUser[]> {
        return this.http.get(this.urlService.getUrlListTrainer(), this.opts)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     getUsers(): Observable<ListUser[]> {
        return this.http.get(this.urlService.getUrlUsers(), this.opts)
           .map((res: Response) => res.json())
           .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     getUserById(id: number): Observable<ListUser> {
        return this.http.get(this.urlService.getUrlUserById(id), this.opts)
           .map((res: Response) => res.json())
           .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     public createDataUser(userData: AddUsers): Observable<boolean>{
        return this.http.post(this.urlService.postUrlAddUser(),userData, this.opts)
        .map(this.extractData)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     getGrades(): Observable<ListGrade[]> {
        return this.http.get(this.urlService.getUrlGrade(), this.opts)
           .map((res: Response) => res.json())
           .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     getLocations(): Observable<ListLocation[]> {
        return this.http.get(this.urlService.getUrlLocation(), this.opts)
           .map((res: Response) => res.json())
           .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     public editDataActiveUser(employeeId:number, active: AddActive): Observable<boolean>{

        return this.http.post(this.urlService.postUrlEditActiveUser(employeeId),active, this.opts)
        .map(this.extractData)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }
     public editDataRolesUser(employeeId:number, roles: AddRole[]): Observable<boolean>{
        return this.http.post(this.urlService.postUrlEditRolesUser(employeeId),roles, this.opts)
        .map(this.extractData)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }
     private extractData(res:Response) {
        let body = res.json();
        return body || [];
     } 
}