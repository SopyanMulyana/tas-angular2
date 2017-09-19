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
import { TestService } from "../../services/test.service";



//Structure
@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']

})
export class UserComponent{
  userRole;
  // users;
  // constructor(private listUserService: TestService) { 
  // this.users=listUserService.getUsers();
  // } 
  users;
  displayedColumns = ['employeeId', 'fullName', 'email', 'jobFamily', 'grade', 'accountName', 'active', 'role', 'action'];
  userDatabase;
  dataSource: UserDataSource | null;

  // @ViewChild(MdPaginator) _paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;
  constructor(public addUser: MdDialog, private listUserService: TestService) {
    // this.userDatabase = new UserDatabase();
    // this.dataSource = new UserDataSource(this.userDatabase);

    this.listUserService.getUsers().subscribe(((users) => {
      this.users = users;
      this.userDatabase = new UserDatabase(this.users); 
      this.dataSource = new UserDataSource(this.userDatabase);
    }));
    
    // console.log(listUserService.getUsers());
    // console.log("ABD");
    // this.users=listUserService.getUsers();
    // this.users.forEach(element => {
    //   console.log(element);
    // });
    // this.userDatabase = new UserDatabase(this.users);
    // this.dataSource = new UserDataSource(this.userDatabase);
  }
  
  ngOnInit() {
    //this.dataSource = new UserDataSource(this.userDatabase, this.paginator);
    // //below is for filter
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //     .debounceTime(150)
    //     .distinctUntilChanged()
    //     .subscribe(() => {
    //       if (!this.dataSource) { return; }
    //       this.dataSource.filter = this.filter.nativeElement.value;
    //     });
    //     var user = JSON.parse(localStorage.getItem('currentUser'));
    //     this.userRole = user.role;
  }
  
  // trainingName: string;
  // startDate: string;
  // endDate: string;
  
  // openDialogAdd(): void {
  //   let dialogRef = this.addUser.open(AddUserDialog, {
  //     width: '80%',
  //     data: {  }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //   });
  // }

}

//Add User dialog
// @Component({
//   templateUrl: 'add-user-dialog.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class AddUserDialog {
//   displayedColumns = ['employeeId','fullName','jobFamily', 'grade', 'email', 'accountName'];
//   servis: ListUserService;
//   users;
//   userDatabase = new UserDatabase(this.users);
//   dataSource: UserDataSource | null;

//   @ViewChild(MdPaginator) paginator: MdPaginator;
//   @ViewChild('filter') filter: ElementRef;

//   addUserFormControl = new FormControl('', [
//     Validators.required
//   ]);

//   ngOnInit() {
//     this.dataSource = new UserDataSource(this.userDatabase, this.paginator);
//     //below is for filter
//     Observable.fromEvent(this.filter.nativeElement, 'keyup')
//         .debounceTime(150)
//         .distinctUntilChanged()
//         .subscribe(() => {
//           if (!this.dataSource) { return; }
//           this.dataSource.filter = this.filter.nativeElement.value;
//         });
//         var user = JSON.parse(localStorage.getItem('currentUser'));
//   }
//   constructor(
//     public dialogRef: MdDialogRef<AddUserDialog>,
//     @Inject(MD_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }


//table
// export interface User {
//   employeeId: number;
//   fullName: string;
//   email: string;
//   jobFamily: string;
//   grade: string;
//   accountName: string;
//   active: string;
//   role: string;
// }

export class UserDatabase{
  
  dataChange: BehaviorSubject<ListUser[]> = new BehaviorSubject<ListUser[]>([]);
  get data(): ListUser[] { return this.dataChange.value; }
  
  // constructor()
  // {
  //   this.dataChange.next([
  //     {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
  //     {employeeId: 1011, fullName: 'Yuliawan Rizka' , email: 'yulian@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\yuliwan', active: 'yes', role: 'User'}, 
  //   ]);
  // }
  private listUserService: TestService;
  // users = this.listUserService.getUsers();
  datatest: Array<ListUser>;
  constructor(private users: ListUser[]) {
  
    // for (var user in this.users) { 
    //   this.datatest.push(user.data.);
      // this.dataChange.next(users);
    //  }
    for (let i = 0; i < users.length; i++) { 
      alert(this.users[i].employeeId);
      const copiedData = this.data.slice();
      copiedData.push({
        employeeId: this.users[i].employeeId,
        fullName: this.users[i].fullName,
        email: "string",
        jobFamily: "string",
        grade: "string",
        accountName: "string",
        active: "string",
        role: "string",
      });
      this.dataChange.next(copiedData);
    }
    // users.forEach(element => {
    //   this.datatest.push(element);
    // });
    // this.dataChange.next(this.datatest);
  }
   
}
// export class GetComponent implements OnInit {
//   users;
//   constructor(private listUserService: TestService) {
//     console.log(listUserService.getUsers());
//     this.users = listUserService.getUsers();
//   }

//   ngOnInit() {
 
//   }
// }

export class UserDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: ListUser[] = [];
  renderedData: ListUser[] = [];
  constructor(private _userDatabase: UserDatabase) {
    super();
  }
  connect(): Observable<ListUser[]> {
    const displayDataChanges = [
      this._userDatabase.dataChange,
      this._filterChange,
      // this._paginator.page,
    ];


    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this._userDatabase.data.slice().filter((item: ListUser) => {
        let searchStr = (item.fullName).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      // Grab the page's slice of data.
      // const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      // this.renderedData = this.filteredData.splice(startIndex, this._paginator.pageSize);
      return  this.filteredData;
    });
  }

  disconnect() {}
}