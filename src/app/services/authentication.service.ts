import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UrlService } from './url.service';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private urlAuth: UrlService) { }

    login(username: string, password: string, remember_me: boolean) {
        console.log(remember_me);
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Charset", "UTF-8");
        let opts:RequestOptionsArgs = { headers : headers };
        return this.http.post(this.urlAuth.getUrlAuth(), JSON.stringify({ username: username, password: password, rememberMe: remember_me}), opts)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('userRole',user.role);
                    localStorage.setItem('activeRole',user.role[0]);
                    localStorage.setItem('token', "Bearer " + user.token);
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('activeRole');
    }
}