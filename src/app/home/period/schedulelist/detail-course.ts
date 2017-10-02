import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../../services/period.service";
import { UserService } from "../../../services/user.service";
import { ListCourseSchedule } from "./schedule-list";


@Component({
    templateUrl: 'detail-course.html',
    styleUrls: ['../period.component.css']
  })
  export class DetailDialog implements OnInit{
    
    idTraining;
    idCourse;
    detailCourse: any ={};
    constructor(
      public dialogRef: MdDialogRef<DetailDialog>,
      @Inject(MD_DIALOG_DATA) public data: any, public periodService: PeriodService) {
            this.idTraining = data.idTraining;
            this.idCourse = data.idCourse;
       }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
        this.periodService.getDetailCourse(this.idTraining, this.idCourse).subscribe((detailCourse => {
            this.detailCourse=detailCourse;
        }));
    }

  }