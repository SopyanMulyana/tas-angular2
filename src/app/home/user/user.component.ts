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



//Structure
@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']

})
export class UserComponent{
  userRole;
  displayedColumns = ['employeeId', 'fullName', 'email', 'jobFamily', 'grade', 'accountName', 'active', 'role', 'action'];
  userDatabase = new UserDatabase();
  dataSource: UserDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;
  
  

  ngOnInit() {
    this.dataSource = new UserDataSource(this.userDatabase, this.paginator);
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
  
  // trainingName: string;
  // startDate: string;
  // endDate: string;
  

  constructor(public addUser: MdDialog) {}

  openDialogAdd(): void {
    let dialogRef = this.addUser.open(AddUserDialog, {
      width: '80%',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

//Add User dialog
@Component({
  templateUrl: 'add-user-dialog.component.html',
  styleUrls: ['./user.component.css']
})
export class AddUserDialog {
  displayedColumns = ['employeeId','fullName','jobFamily', 'grade', 'email', 'accountName'];
  servis: ListUserService;
  userDatabase = new UserDatabase();
  dataSource: UserDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;

  addUserFormControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
    this.dataSource = new UserDataSource(this.userDatabase, this.paginator);
    //below is for filter
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
        var user = JSON.parse(localStorage.getItem('currentUser'));
  }
  constructor(
    public dialogRef: MdDialogRef<AddUserDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



export class UserDatabase{
  
  dataChange: BehaviorSubject<ListUser[]> = new BehaviorSubject<ListUser[]>([]);
  get data(): ListUser[] { return this.dataChange.value; }
  
  private listUserService: ListUserService;
  //users = this.listUserService.getUsers();
  constructor() {
      this.dataChange.next([
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},        
        {employeeId: 1011, fullName: 'Yuliawan Rizka' , email: 'yulian@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\yuliwan', active: 'yes', role: 'User'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
        {employeeId: 1010, fullName: 'Sopyan Mulyana' , email: 'sopyan@mitrais.com' , jobFamily: 'SE SE-MWA', grade: 'AP', accountName: 'mitrais\\sopyan', active: 'yes', role: 'Trainer'},
      ]);
  }
   
}
export class GetComponent implements OnInit {
  users;
  constructor(private listUserService: ListUserService) {
    console.log(listUserService.getUsers());
    this.users = listUserService.getUsers();
  }

  ngOnInit() {
 
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