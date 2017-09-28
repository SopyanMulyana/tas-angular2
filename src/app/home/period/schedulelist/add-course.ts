import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../../services/period.service";
import { UserService } from "../../../services/user.service";
import { ListCourseSchedule } from "./schedule-list";
import { ListForAddCourse } from "./course-list";
import { ClassRoom } from "./class-room";
import { ListUser } from "../../../home/user/list-user";
import { AddCoursePeriod } from "./add-course-period";

@Component({
    templateUrl: 'add-course.html',
    styleUrls: ['../period.component.css']
  })
  export class AddCourseDialog implements OnInit{
    addPeriodFormControl = new FormControl('', [
      Validators.pattern('^[0-9]*$')
    ]);
    finalDataCourse: AddCoursePeriod;
    temporaryData: any={} ;
    trainers: ListUser[] =[];
    courses: ListForAddCourse[] = [];
    classrooms: ClassRoom[] = [];

    //periodService: PeriodService;
    result;
    idTraining;
    constructor(
      public dialogRef: MdDialogRef<AddCourseDialog>,
      @Inject(MD_DIALOG_DATA) public data: any, public periodService: PeriodService, public userService: UserService) {
            this.idTraining = data.id;

       }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
        this.userService.getTrainerList().subscribe((trainerList => {
            this.trainers = trainerList;
        }));
        this.periodService.getListForAddCourse().subscribe((courses => {
            this.courses = courses;
        }));
        this.periodService.getClassRoom().subscribe((classroom => {
            this.classrooms = classroom;
        }));
      //  this.temporaryData.trainingName="";
      // this.temporaryData.startDate=new Date();
      //  this.temporaryData.endDate=new Date();
    }
    addCourse(): void {
      this.finalDataCourse = {courseId: this.temporaryData.courseName, mainTrainerId: this.temporaryData.mainTrainer, backupTrainerId: this.temporaryData.backupTrainer, classroomId: this.temporaryData.classroom, capacity: +this.temporaryData.capacity}
      console.log(this.finalDataCourse);
        this.periodService.addCourse(this.idTraining, this.finalDataCourse).subscribe(((res) => {
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