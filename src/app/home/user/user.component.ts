import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { ListUserService } from "../../services/list-user.service";
import { ListUser } from "./list-user";
import { AddUserDialog } from "./add-user-dialog.component";



//Structure
@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']

})
export class UserComponent{
  userRole;
  users;
  displayedColumns = ['employeeId', 'fullName', 'email', 'jobFamily', 'grade', 'accountName', 'active', 'role', 'action'];
  userDatabase;
  dataSource: UserDataSource | null;
  // private listUserService: ListUserService;

  @ViewChild(MdPaginator) _paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;
  constructor(public addUser: MdDialog, public listUserService: ListUserService) {
       this.listUserService.getUsers().subscribe((users => {
         this.users = users;
         this.userDatabase = new UserDatabase(this.users); 
         this.dataSource = new UserDataSource(this.userDatabase, this._paginator);
       }));
     }
  

  ngOnInit() {
    //below is for filter
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.userRole = user.role;
  }
  

  openDialogAdd(): void {
    let dialogRef = this.addUser.open(AddUserDialog, {
      width: '80%',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

export class UserDatabase{
  
  dataChange: BehaviorSubject<ListUser[]> = new BehaviorSubject<ListUser[]>([]);
  get data(): ListUser[] { return this.dataChange.value; }
  
  constructor(private users: ListUser[]) {
      this.dataChange.next(users);
  } 
}

export class UserDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: ListUser[] = [];
  renderedData: ListUser[] = [];
  constructor(private _userDatabase: UserDatabase, private _paginator: MdPaginator) {
    super();
  }
  connect(): Observable<ListUser[]> {
    const displayDataChanges = [
      this._userDatabase.dataChange,
      this._filterChange,
      this._paginator.page,
    ];


    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this._userDatabase.data.slice().filter((item: ListUser) => {
        let searchStr = (item.fullName).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });


      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = this.filteredData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {}
}