import { Employee } from "./employee";
import { EmployeeService } from '../../services/employee.service';
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

@Component({
  templateUrl: 'add-user-dialog.component.html',
  styleUrls: ['./user.component.css']
})
export class AddUserDialog {
  displayedColumns = ['employeeId','fullName','jobFamily', 'grade', 'email', 'accountName'];
  employee;
  @ViewChild(MdPaginator) _paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;
  userDatabase;
  employeeService: EmployeeService;
  dataSource: UserDataSource | null;

  addUserFormControl = new FormControl('', [
    Validators.required
  ]);
  constructor(public dialogRef: MdDialogRef<AddUserDialog>,
    @Inject(MD_DIALOG_DATA) public data: any){  
     }
  ngOnInit() {
    //below is for filter
    this.employeeService.getEmployees().subscribe(((employee) => {
    this.employee = employee;
    this.userDatabase = new UserDatabase(this.employee);
    this.dataSource = new UserDataSource(this.userDatabase, this._paginator);
    }));
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
        var user = JSON.parse(localStorage.getItem('currentUser'));
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}



export class UserDatabase{
    
    dataChange: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
    get data(): Employee[] { return this.dataChange.value; }
    
    
    //users = this.listUserService.getUsers();
    constructor(private users: Employee[]) {
        this.dataChange.next(users);
    }
     
  }
  
  export class UserDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) {
      this._filterChange.next(filter);
    }
    filteredData: Employee[] = [];
    renderedData: Employee[] = [];
    constructor(private _userDatabase: UserDatabase, private _paginator: MdPaginator) {
      super();
    }
    connect(): Observable<Employee[]> {
      const displayDataChanges = [
        this._userDatabase.dataChange,
        this._filterChange,
        this._paginator.page,
      ];
  
  
      return Observable.merge(...displayDataChanges).map(() => {
        this.filteredData = this._userDatabase.data.slice().filter((item: Employee) => {
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