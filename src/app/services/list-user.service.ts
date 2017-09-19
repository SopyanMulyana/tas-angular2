import { Injectable } from "@angular/core";
import { Http, Response} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ListUser } from "../home/user/list-user";
import "rxjs/Rx";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ListUserService {
private baseUrl = "http://localhost:8080/api/all";  // web api URL
constructor(private http: Http) { }
getAB(){
    return "abc";
}
getListUser() {
    // console.log("test");
    return this.http.get(this.baseUrl)
        .map(res => <ListUser[]> res.json())
        .catch(error => {
            console.log(error);
            return Observable.throw(error);
        });
    // return "abc";
}


getUserData():Observable<ListUser[]> {
    return this.http.get(this.baseUrl)
    .map(this.extractData)
    .catch(this.handleError);
    }
    
    private extractData(res:Response) {
    let body = res.json();
    return body || [];
} 

    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
} 
}


// return this.http.get("https://jsonplaceholder.typicode.com/users")
// .map((res: Response) => res.json())
// .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 

// getUser(id: number): Promise<Person> {
//     const url = `${this.usersUrl}/${id}`;
//     return this.http.get(url)
//     .toPromise()
//     .then(response => response.json().data as Person)
//     .catch(this.handleError);
//     } 
