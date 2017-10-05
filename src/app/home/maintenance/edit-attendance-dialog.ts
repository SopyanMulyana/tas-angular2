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
import { PostEditAttendance } from "./edit-attendance-post";
import { MaintenanceService } from "../../services/maintenance.service";
import { ListEditAttendance } from "./edit-attendance-get";
import { ListEditAssesment } from "./edit-assesment-get";
import { PostEditAssesment } from "./edit-assesment-post";



//Structure
@Component({
  templateUrl: 'edit-attendance-dialog.html',
  styleUrls: ['./maintenance.component.css']
})
export class EditAttendanceDialog implements OnInit{
  
  // idTraining;
  // idCourse;
  // detailEnrollment: any ={};
  courseName: string;
  courseDate: string;
  currentData;
  statusAttendanceText: any=[];
  statusAttendanceId: any=[];
  statusAssessmentText: any=[];
  statusAssessmentId: any=[];
  statuss: any = [];
  isAssessment;


  @ViewChild(MdSort) sort: MdSort;
  ngOnInit() {
    
  }
  displayedColumns = ['employeeName','status'];
  displayedColumns2 = ['employee','statusAssessment'];

  eligibleDatabase;
  dataSource: EligibleDataSource | null;
  trainingId:number;
  result;
  
  selection = new SelectionModel<string>(true, []);
  finalData: PostEditAttendance[] = [];
  finalDataAssessment: PostEditAssesment[] = [];
  periodDatas: ListEditAttendance[];
  periodId;
  scheduleId;

  periodDataAssessment: ListEditAssesment[];
  assessmentDatabase; 
  assessmentdataSource: AssessmentDataSource | null;

  a:any;

  constructor(public dialogRef: MdDialogRef<EditAttendanceDialog>,
    @Inject(MD_DIALOG_DATA) public data: any, private maintenanceService:MaintenanceService) {
   // this.eligibleDatabase = new EligibleDatabase();
  //  console.log(data);
    var that = this;
    this.courseName = data.courseName;
    this.courseDate = data.courseDate;
    this.periodId = data.periodId;
    this.isAssessment = data.isAssessment;
    console.log(this.isAssessment+ "="+data.isAssessment)
    if (this.isAssessment==true) {
      this.statuss = [
        {value: '1', viewValue: 'Passed'},
        {value: '2', viewValue: 'Failed'}
      ];
      this.maintenanceService.getListPersonForAssessment(this.periodId).subscribe(((listUserToEdit) => {
        console.log(listUserToEdit);
        listUserToEdit.forEach(element => {
          if (element.status==true) {
            that.statusAssessmentText[element.id]="Passed";
          }
          else if (element.status==false) {
            that.statusAssessmentText[element.id]="Failed";
          }
          });
          that.periodDataAssessment = listUserToEdit;
          that.assessmentDatabase = new AssessmentDatabase(this.periodDataAssessment); 
          that.assessmentdataSource = new AssessmentDataSource(this.assessmentDatabase, this.sort);
          
      }))
    } 
    else {
      this.scheduleId = data.scheduleId;
      this.statuss = [
        {value: '1', viewValue: 'Present'},
        {value: '2', viewValue: 'Excused Absence'},
        {value: '3', viewValue: 'Unexcused Absence'},
        {value: '4', viewValue: 'Drop Out'}
      ];
      this.maintenanceService.getListPersonForAttendance(this.periodId, this.scheduleId).subscribe(((listUserToEdit) => {
        console.log(listUserToEdit);
          listUserToEdit.forEach(element => {
            if (element.attendanceStatus==1) {
              that.statusAttendanceText[element.id]="Present";
            }
            else if (element.attendanceStatus==2) {
              that.statusAttendanceText[element.id]="Excused Absense";
            }
            else if (element.attendanceStatus==3) {
              that.statusAttendanceText[element.id]="Unexcused Absense";
            }
            else if (element.attendanceStatus==4) {
              that.statusAttendanceText[element.id]="Drop Out";
            }
            });
            that.periodDatas = listUserToEdit;
            that.eligibleDatabase = new EligibleDatabase(this.periodDatas); 
            that.dataSource = new EligibleDataSource(this.eligibleDatabase, this.sort);
      }));
    }
    
    //console.log(that.periodDatas);
    // console.log(this.statusAttendance)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  isAllSelected(): boolean {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }


  }
 changeStatus(id:number,statusValue:number){
   
   if (this.isAssessment==true) {
        if (statusValue==1) {
          this.statusAssessmentId[id]=true;
          this.statusAssessmentText[id]="Passed";
        }
        else if (statusValue==2) {
          this.statusAssessmentId[id]=false;
          this.statusAssessmentText[id]="Failed";
        }

   } 
   else {
        this.statusAttendanceId[id]=statusValue;
        if (statusValue==1) {
        this.statusAttendanceText[id]="Present";
      }
      else if (statusValue==2) {
        this.statusAttendanceText[id]="Excused Absense";
      }
      else if (statusValue==3) {
        this.statusAttendanceText[id]="Unexcused Absense";
      }
      else if (statusValue==4) {
        this.statusAttendanceText[id]="Drop Out";
      }
   }
   
 }
  masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    }  
    else {
      this.eligibleDatabase.data.forEach(data => this.selection.select(data.id.toString()));
    }
  }
  saveValue(){
    if (this.isAssessment==true) {
      for (var index = 0; index < this.statusAssessmentId.length; index++) {
        if (this.statusAssessmentId[index]!=null) {
          this.finalDataAssessment.push({enrolledId: index, pass:this.statusAssessmentId[index]})
        }
      }
      console.log(this.finalDataAssessment);
      this.maintenanceService.editAssessment(this.periodId,this.finalDataAssessment).subscribe(((res) => {
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

    else {
      for (var index = 0; index < this.statusAttendanceId.length; index++) {
        if (this.statusAttendanceId[index]!=null) {
          this.finalData.push({enrolledId: index, status:this.statusAttendanceId[index]})
        }
      }
      console.log(this.finalData);
      this.maintenanceService.editAttendance(this.periodId,this.scheduleId,this.finalData).subscribe(((res) => {
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
}


//table

export class EligibleDatabase {
  dataChange: BehaviorSubject<ListEditAttendance[]> = new BehaviorSubject<ListEditAttendance[]>([]);
  get data(): ListEditAttendance[] { return this.dataChange.value; }

    constructor(private periodDatas: ListEditAttendance[]) {
  
      this.dataChange.next(periodDatas);
   
  }
}

export class EligibleDataSource extends DataSource<any> {
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
  filteredData: ListEditAttendance[] = [];
  renderedData: ListEditAttendance[] = [];
  constructor(private _periodDatabase: EligibleDatabase, private _sort: MdSort) {
    super();
    this.type = "1";
  }

  connect(): Observable<ListEditAttendance[]> {
    const displayDataChanges = [
      this._periodDatabase.dataChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {

       const sortedData = this.getSortedData(this._periodDatabase.data.slice());
  
        return sortedData;

    });
  }

  disconnect() {}

  
  getSortedData(data: ListEditAttendance[]): ListEditAttendance[] {

    return data;
  }
}

export class AssessmentDatabase {
  dataChange: BehaviorSubject<ListEditAssesment[]> = new BehaviorSubject<ListEditAssesment[]>([]);
  get data(): ListEditAssesment[] { return this.dataChange.value; }

    constructor(private periodDatas: ListEditAssesment[]) {
  
      this.dataChange.next(periodDatas);
   
  }
}

export class AssessmentDataSource extends DataSource<any> {
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
  filteredData: ListEditAssesment[] = [];
  renderedData: ListEditAssesment[] = [];
  constructor(private _assessmentDatabase: AssessmentDatabase, private _sort: MdSort) {
    super();
    this.type = "1";
  }

  connect(): Observable<ListEditAssesment[]> {
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

  
  getSortedData(data: ListEditAssesment[]): ListEditAssesment[] {

    return data;
  }
}

