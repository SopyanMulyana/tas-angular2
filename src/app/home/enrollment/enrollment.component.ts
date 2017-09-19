import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
// import { Router } from '@angular/router';
import { MdPaginator } from '@angular/material';
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
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent {
  fullName;

  displayedColumns = ['periodName', 'courseName', 'trainer', 'startAt', 'endAt', 'status'];
  enrollmentDatabase = new EnrollmentDatabase();
  dataSource: EnrollmentDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor (private authenticationService: AuthenticationService){ 
                  var user = JSON.parse(localStorage.getItem('currentUser'));
                  this.fullName = user.fullName;
                }

  ngOnInit() {
    this.dataSource = new EnrollmentDataSource(this.enrollmentDatabase, this.paginator);
  }

}

export interface Enrollment {
  periodName: string;
  courseName: string;
  trainer: string;
  startAt: string;
  endAt: string;
  status: string;
}

export class EnrollmentDatabase {
  dataChange: BehaviorSubject<Enrollment[]> = new BehaviorSubject<Enrollment[]>([]);
  get data(): Enrollment[] { return this.dataChange.value; }

  constructor() {
    this.dataChange.next([
      {periodName: 'Software Requirment', courseName: 'Software Requirment #1', trainer: 'Made Arditya', startAt: '7-7-2016', endAt: '7-7-2018', status: 'In Progress'},
      {periodName: 'English Training', courseName: 'Pronouncation #1', trainer: 'Cyntia Mulyana', startAt: '7-7-2016', endAt: '7-7-2018', status: 'In Progress'}
      ]);
  }
}

export class EnrollmentDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: Enrollment[] = [];
  renderedData: Enrollment[] = [];
  constructor(private _enrollmentDatabase: EnrollmentDatabase, private _paginator: MdPaginator) {
    super();
  }
  connect(): Observable<Enrollment[]> {
    const displayDataChanges = [
      this._enrollmentDatabase.dataChange,
      this._filterChange,
      this._paginator.page,
    ];


    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this._enrollmentDatabase.data.slice().filter((item: Enrollment) => {
        let searchStr = (item.trainer).toLowerCase();
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
