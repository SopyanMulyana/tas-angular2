/////////////////////////////////
import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator,MdSort, SelectionModel } from '@angular/material';
import { DatePipe } from '@angular/common';

import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ListForEligibleParticipants } from "../eligibleparticipants/user-for-eligible";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { PeriodService } from "../../../services/period.service";
import { AddUserForEligible } from "../eligibleparticipants/add-user-for-eligible";


//Structure
@Component({
  templateUrl: 'enroll-participants.html',
  styleUrls: ['../period.component.css']
})
export class AddEnrollDialog implements OnInit {

  @ViewChild('filter') filter: ElementRef;

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  ngOnInit() {
    
  }
  displayedColumns = ['action','fullName'];
  enrollDatabase;
  dataSource: ParicipantsDataSource | null;
  trainingId:number;
  courseId:number;
  result;
  
  selection = new SelectionModel<string>(true, []);
  finalData: AddUserForEligible[] = [];
  enrollDatas:ListForEligibleParticipants[];
  constructor(public dialogRef: MdDialogRef<AddEnrollDialog>,
    @Inject(MD_DIALOG_DATA) public data: any, private periodService:PeriodService) {
   // this.enrollDatabase = new EligibleDatabase();
      this.trainingId=data.idTraining;
      this.courseId = data.idCourse;
   this.periodService.getListForEnrollParticipants(data.idTraining, data.idCourse).subscribe(((enrollDatas) => {
    this.enrollDatas = enrollDatas;

    this.enrollDatabase = new EligibleDatabase(this.enrollDatas); 

    this.paginator._length = this.enrollDatabase.data.length;
    this.paginator.pageSize = 10;
    this.paginator._pageIndex = 0;

    this.dataSource = new ParicipantsDataSource(this.enrollDatabase, this.paginator, this.sort);

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
  onNoClick(): void {
    this.dialogRef.close();
  }
  isAllSelected(): boolean {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }

    if (this.filter.nativeElement.value) {
      return this.selection.selected.length == this.dataSource.renderedData.length;
    } else {
      return this.selection.selected.length == this.enrollDatabase.data.length;
    }
  }

  masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else if (this.filter.nativeElement.value) {
      this.dataSource.renderedData.forEach(data => this.selection.select(data.employeeId.toString()));
      
    } else {
      this.enrollDatabase.data.forEach(data => this.selection.select(data.employeeId.toString()));
    }
  }
  saveData() {
    
    this.selection.selected.forEach(element => this.finalData.push({employeeId: element}));
    console.log(this.finalData);

    this.periodService.addEnrollParticipants(this.trainingId, this.courseId, this.finalData).subscribe(((res) => {
      this.result = res;
      if(this.result == true){
        console.log(this.result);
        window.location.reload();
      //this.notificationService.setNotificationInfo('Period success to created');
      }else{
      //this.notificationService.setNotificationError('Period failed to created !');
      console.log(this.result);
      }
      })); 
      this.dialogRef.close();
  }
}

//table

export class EligibleDatabase {
  dataChange: BehaviorSubject<ListForEligibleParticipants[]> = new BehaviorSubject<ListForEligibleParticipants[]>([]);
  get data(): ListForEligibleParticipants[] { return this.dataChange.value; }

    constructor(private enrollDatas: ListForEligibleParticipants[]) {
  
      this.dataChange.next(enrollDatas);
   
  }
}

export class ParicipantsDataSource extends DataSource<any> {
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
  filteredData: ListForEligibleParticipants[] = [];
  renderedData: ListForEligibleParticipants[] = [];
  //sortedData: Period[] = [];
  constructor(private _periodDatabase: EligibleDatabase,  private _paginator: MdPaginator,private _sort: MdSort) {
    super();
    this.type = "1";
  }

  connect(): Observable<ListForEligibleParticipants[]> {
    const displayDataChanges = [
      this._periodDatabase.dataChange,
      this._filterChange,
      this._paginator.page,
      this._sort.mdSortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {

     
        this.filteredData = this._periodDatabase.data.slice().filter((item: ListForEligibleParticipants) => {
          let searchStr = (item.fullName).toLowerCase();
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

  
  getSortedData(data: ListForEligibleParticipants[]): ListForEligibleParticipants[] {
    //const data = this._periodDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'trainingPeriodID': [propertyA, propertyB] = [a.employeeId, b.employeeId]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
