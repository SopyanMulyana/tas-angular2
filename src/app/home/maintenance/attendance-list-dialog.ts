import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MaintenanceService } from "../../services/maintenance.service";



@Component({
    templateUrl: 'attendance-list-dialog.html',
    styleUrls: ['./maintenance.component.css']
  })
  export class AttendanceListDialog implements OnInit{
    
    // idTraining;
    // idCourse;
    // detailEnrollment: any ={};
    courseName: string;
    currentData;
    constructor(
      public dialogRef: MdDialogRef<AttendanceListDialog>,
      @Inject(MD_DIALOG_DATA) public data: any, private maintenanceService:MaintenanceService) {
        this.courseName = data.courseName;
        var that = this;
        this.maintenanceService.getAttendanceList(data.coursePeriodId).subscribe(((attendanceDatas) => {
          that.currentData = attendanceDatas;
        }));
        console.log(this.currentData);
       }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
        
    }

  }