/////////////////////////////////
import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator,MdSort, SelectionModel } from '@angular/material';
import { DatePipe } from '@angular/common';

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

import { Router } from '@angular/router';
import { DashboardService } from "../../services/dashboard.service";
import { ActiveTraining } from "./active-training";
import { BCCSchedule } from "./bcc-schedule";



@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Active Training DataStream
  activeTrainingColumns = ['courseName', 'mainTrainer', 'backupTrainer', 'startDate', 'endDate', 'trainingLocation'];
  //BCC Schedule DataStream
  BCCColumns = ['trainerName', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  activeTrainingData: ActiveTraining[];
  BCCScheduleData: BCCSchedule[];
  
  activeTrainingDataBase;
  activeTrainingDataSource: ActiveTrainingDataSource | null;

  bccDatabase; 
  bccdataSource: BCCScheduleDataSource | null;


  @ViewChild(MdSort) sort: MdSort;
  ngOnInit() {
    
  }
  constructor( private dashboardService:DashboardService) {
   // this.eligibleDatabase = new ActiveTrainingDataBase();
  //  console.log(data);
  var that =this;
  this.dashboardService.getActiveTrainingList().subscribe(((activeTrainingData) => {
        console.log(activeTrainingData);
          that.activeTrainingData = activeTrainingData;
          that.activeTrainingDataBase = new ActiveTrainingDataBase(this.activeTrainingData); 
          that.activeTrainingDataSource = new ActiveTrainingDataSource(this.activeTrainingDataBase, this.sort);
          
      }));
      this.dashboardService.getBCCScheduleList().subscribe(((BCCScheduleData) => {
        console.log(BCCScheduleData);
          that.BCCScheduleData = BCCScheduleData;
          that.bccDatabase = new BBCScheduleDataBase(this.BCCScheduleData); 
          that.bccdataSource = new BCCScheduleDataSource(this.bccDatabase, this.sort);
          
      }));
    } 
    

 
}
  



//table

export class ActiveTrainingDataBase {
  dataChange: BehaviorSubject<ActiveTraining[]> = new BehaviorSubject<ActiveTraining[]>([]);
  get data(): ActiveTraining[] { return this.dataChange.value; }

    constructor(private periodDatas: ActiveTraining[]) {
  
      this.dataChange.next(periodDatas);
   
  }
}

export class ActiveTrainingDataSource extends DataSource<any> {
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
  filteredData: ActiveTraining[] = [];
  renderedData: ActiveTraining[] = [];
  constructor(private _activeTrainingDatabase: ActiveTrainingDataBase, private _sort: MdSort) {
    super();
    this.type = "1";
  }

  connect(): Observable<ActiveTraining[]> {
    const displayDataChanges = [
      this._activeTrainingDatabase.dataChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {

       const sortedData = this.getSortedData(this._activeTrainingDatabase.data.slice());
  
        return sortedData;

    });
  }

  disconnect() {}

  
  getSortedData(data: ActiveTraining[]): ActiveTraining[] {

    return data;
  }
}

export class BBCScheduleDataBase {
  dataChange: BehaviorSubject<BCCSchedule[]> = new BehaviorSubject<BCCSchedule[]>([]);
  get data(): BCCSchedule[] { return this.dataChange.value; }

    constructor(private periodDatas: BCCSchedule[]) {
  
      this.dataChange.next(periodDatas);
   
  }
}

export class BCCScheduleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  public type:string;
 
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filter123(filter:string,type:string)
  {
    this.type = type;
    this._filterChange.next(filter);
  }
  filteredData: BCCSchedule[] = [];
  renderedData: BCCSchedule[] = [];
  constructor(private _assessmentDatabase: BBCScheduleDataBase, private _sort: MdSort) {
    super();
    this.type = "1";
  }

  connect(): Observable<BCCSchedule[]> {
    const displayDataChanges = [
      this._assessmentDatabase.dataChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {

       const sortedData = this.getSortedData(this._assessmentDatabase.data.slice());
  
        return sortedData;

    });
  }

  disconnect() {}

  
  getSortedData(data: BCCSchedule[]): BCCSchedule[] {

    return data;
  }
}

