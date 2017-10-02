import { Component, ElementRef, Inject, ViewChild, OnInit, OnChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../../services/period.service";
import { Periods } from "../period";
import { AddPeriods } from "../add-period";
import { ListCourseSchedule } from "./schedule-list";


@Component({
  templateUrl: 'update-schedule.component.html',
  styleUrls: ['../period.component.css']
})
export class UpdateScheduleComponent implements OnInit{
  finalData;
  currentDatas: ListCourseSchedule[]=[];
  temporaryData: any = {};
  result;
  updateScheduleFormControl = new FormControl('', [
    Validators.required
  ]);
  // constructor(public periodSerice: PeriodService, private router: Router) {
  //   this.curentData = periodSerice.getPeriodById()
  //  }
  trainingId: number;
  periodical: boolean;
  private sub: any;

  times = [
    {value: '17:30', viewValue: '17:30'},
    {value: '18:00', viewValue: '18:00'},
    {value: '18:30', viewValue: '18:30'}
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

  constructor(private route: ActivatedRoute, private periodService: PeriodService, private router: Router) {

  }
  ngOnInit() {
    // edit period
    this.sub = this.route.params.subscribe(params => {
       this.trainingId = +params['trainingId']; // (+) converts string 'id' to a number
       this.periodical = params['periodical'] == 'true';
       this.periodService.getCourseList(this.trainingId).subscribe((res => {
        this.currentDatas=res;
        console.log(res);
        })); 
    });
    //elligible participants
    
  }

  updateSchedule() {
    // this.finalData = new AddPeriods(this.currentData.trainingName,
    //   this.currentData.startDate, this.currentData.endDate, 
    //   this.currentData.openEnrollment,  this.currentData.activeStatus );
    // console.log(this.finalData);
    //   this.periodService.editDataPeriod(id,this.finalData).subscribe(((res) => {
    //     this.result = res;
    //     if(this.result == true){
    //       console.log(this.result);
    //       window.location.reload();
    //     //this.notificationService.setNotificationInfo('Period success to created');
    //     }else{
    //     //this.notificationService.setNotificationError('Period failed to created !');
    //     console.log(this.result);
    //     }
    //     })); 
    //     this.router.navigate(['/home/period/']);
  }
}