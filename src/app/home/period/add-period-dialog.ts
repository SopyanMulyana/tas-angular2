import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../services/period.service";
import { AddPeriods } from "./add-period";

@Component({
    templateUrl: 'add-period-dialog.html',
    styleUrls: ['./period.component.css']
  })
  export class AddPeriodDialog implements OnInit{
    addPeriodFormControl = new FormControl('', [
      Validators.required
    ]);
    addPeriod: AddPeriods;
    temporaryData: any={} ;
    //periodService: PeriodService;
    result;
    constructor(
      public dialogRef: MdDialogRef<AddPeriodDialog>,
      @Inject(MD_DIALOG_DATA) public data: any, public periodService: PeriodService) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
      //  this.temporaryData.trainingName="";
      // this.temporaryData.startDate=new Date();
      //  this.temporaryData.endDate=new Date();
      this.temporaryData.openEnrollment=false;
    }
    addAperiod(): void {
      this.addPeriod = new AddPeriods(this.temporaryData.trainingName,
        this.temporaryData.startDate, this.temporaryData.endDate, 
        this.temporaryData.openEnrollment, true);
      console.log(this.addPeriod);
        this.periodService.createDataPeriod(this.addPeriod).subscribe(((res) => {
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