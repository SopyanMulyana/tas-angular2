import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
// import { Router } from '@angular/router';
import { MdPaginator, MdSort } from '@angular/material';
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
import { ListEnrollment } from "./enrollment";
import { EnrollmentService } from "../../services/enrollment.service";

@Component({
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent {
  fullName;

  

  @ViewChild('filter') filter: ElementRef;
  @ViewChild('filter1') filter1: ElementRef;

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  displayedColumns = ['periodName', 'courseName', 'trainer', 'startAt', 'endAt', 'status'];
  enrollmentDatabase;
  dataSource: EnrollmentDataSource | null;
  enrollmentDatas:ListEnrollment[];
  constructor(private authenticationService: AuthenticationService, private periodService:EnrollmentService) {
   // this.enrollmentDatabase = new EnrollmentDatabase();
   var user = JSON.parse(localStorage.getItem('currentUser'));
   this.fullName = user.fullName;
   this.periodService.getEnrollmentList().subscribe(((enrollmentDatas) => {
    this.enrollmentDatas = enrollmentDatas;

    this.enrollmentDatabase = new EnrollmentDatabase(this.enrollmentDatas); 

    this.paginator._length = this.enrollmentDatabase.data.length;
    this.paginator.pageSize = 10;
    this.paginator._pageIndex = 0;

    this.dataSource = new EnrollmentDataSource(this.enrollmentDatabase, this.paginator, this.sort);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { return; }

      this.dataSource.name = this.filter.nativeElement.value;
      this.dataSource.filter = this.filter.nativeElement.value;
   
      // //alert(this.filter1.nativeElement.value);
    });

    // Observable.fromEvent(this.filter1.nativeElement, 'keyup')
    // .debounceTime(150)
    // .distinctUntilChanged()
    // .subscribe(() => {
    //   if (!this.dataSource) { return; }
    //   alert(this.filter1.nativeElement.value);
    //   this.dataSource.created = this.filter1.nativeElement.value;
    //   this.dataSource.filter = this.filter1.nativeElement.value;
    // });

  }));
  }


  ngOnInit() {
    
  }

}



export class EnrollmentDatabase {
  dataChange: BehaviorSubject<ListEnrollment[]> = new BehaviorSubject<ListEnrollment[]>([]);
  get data(): ListEnrollment[] { return this.dataChange.value; }

  constructor(private enrollmentDatas: ListEnrollment[]) {
    this.dataChange.next(enrollmentDatas);
  }
}

export class EnrollmentDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  public type:string;
  public created:string = "";
  public name:string = "";
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filter123(filter:string,type:string)
  {
    this.type = type;
    this._filterChange.next(filter);
  }
  filteredData: ListEnrollment[] = [];
  renderedData: ListEnrollment[] = [];
  //sortedData: Period[] = [];
  constructor(private _enrollmentDatabase: EnrollmentDatabase,  private _paginator: MdPaginator,private _sort: MdSort) {
    super();
    this.type = "1";
  }

  connect(): Observable<ListEnrollment[]> {
    const displayDataChanges = [
      this._enrollmentDatabase.dataChange,
      this._filterChange,
      this._paginator.page,
      this._sort.mdSortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {

     
        this.filteredData = this._enrollmentDatabase.data.slice().filter((item: ListEnrollment) => {
          let searchStr = (item.courseName).toLowerCase();
          //let searchStr1 = (item.createdDate).toString();
          //return searchStr.indexOf(this.name.toLowerCase()) != -1 && searchStr1.indexOf(this.created.toLowerCase()) != -1;
          return searchStr.indexOf(this.name.toLowerCase()) != -1;
        });
  
       const sortedData = this.getSortedData(this.filteredData.slice());
       const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
       this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
  
        return this.renderedData;

    });
  }

  disconnect() {}

  
  getSortedData(data: ListEnrollment[]): ListEnrollment[] {
    //const data = this._enrollmentDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'courseName': [propertyA, propertyB] = [a.courseName, b.courseName]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
