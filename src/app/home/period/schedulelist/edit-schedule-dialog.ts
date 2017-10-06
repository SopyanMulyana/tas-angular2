
import { Component, ElementRef, Inject, ViewChild, } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator, MdSnackBar } from '@angular/material';
import { Router, } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../../services/period.service";
import { ListUpdateCourse } from "./update-schedule";

@Component({
    templateUrl: 'edit-schedule-dialog.html',
    styleUrls: ['../period.component.css']
  })
  export class EditScheduleDialog {
    result;
    trainingId;
    idCourse: number;
    periodical:boolean;
    finalData: ListUpdateCourse;
    courseName: string;
    temporaryData: any = {};
    times = [
      {value: '06:00'},
      {value: '06:30'},
      {value: '07:00'},
      {value: '07:30'},
      {value: '08:00'},
      {value: '08:30'},
      {value: '09:00'},
      {value: '09:30'},
      {value: '10:00'},
      {value: '10:30'},
      {value: '11:00'},
      {value: '11:30'},
      {value: '12:00'},
      {value: '12:30'},
      {value: '13:00'},
      {value: '13:30'},
      {value: '14:00'},
      {value: '14:30'},
      {value: '15:00'},
      {value: '15:30'},
      {value: '16:00'},
      {value: '16:30'},
      {value: '17:00'},
      {value: '17:30'},
      {value: '18:00'},
      {value: '18:30'},
      {value: '19:00'},
      {value: '19:30'},
      {value: '20:00'},
      {value: '20:30'},
      {value: '21:00'}
    ];
    days = [
      {value: '1', viewValue: 'Sunday'},
      {value: '2', viewValue: 'Monday'},
      {value: '3', viewValue: 'Tuesday'},
      {value: '4', viewValue: 'Wednesday'},
      {value: '5', viewValue: 'Thursday'},
      {value: '6', viewValue: 'Friday'},
      {value: '7', viewValue: 'Saturday'}
    ];
    constructor(public snackbar : MdSnackBar, public dialogRef: MdDialogRef<EditScheduleDialog>, @Inject(MD_DIALOG_DATA) public data: any, private periodService: PeriodService, private router: Router) {
        this.trainingId = data.idTraining;
        this.periodical = data.periodical;
        this.idCourse = data.idCourse;
        this.courseName = data.courseName;
        console.log(data);
    }
    onNoClick(): void {
        this.dialogRef.close();
      }
    saveSchedule(){
      this.finalData = {startDate: this.temporaryData.startDate, endDate: this.temporaryData.endDate, startTime: this.temporaryData.startTime,
                        endTime: this.temporaryData.endTime, day: this.temporaryData.day};
      this.periodService.editDataCourse(this.trainingId, this.idCourse,this.finalData).subscribe(((res) => {
        this.result = res;
        if(this.result == true){
          console.log(this.result);
          let snackBarRef = this.snackbar.open("Success","close", { duration: 1500 });
          snackBarRef.afterDismissed().subscribe(() => {
            window.location.reload();
          });
        //this.notificationService.setNotificationInfo('Period success to created');
        }else{
        //this.notificationService.setNotificationError('Period failed to created !');
        console.log(this.result);
        }
        })); 
      console.log(this.trainingId+" "+this.periodical);
      this.dialogRef.close();
    }
  }