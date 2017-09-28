import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { ListUser } from "../home/user/list-user";
import { UrlService } from './url.service';
import { Observable } from 'rxjs/Rx';
import { User } from '../user';

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
}