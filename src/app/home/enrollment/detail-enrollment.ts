import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
// import { PeriodService } from "../../../services/period.service";



@Component({
    templateUrl: 'detail-enrollment.html',
    styleUrls: ['./enrollment.component.css']
  })
  export class DetailEnrollmentDialog implements OnInit{
    
    idTraining;
    idCourse;
    detailEnrollment: any ={};
    fullName: string;
    constructor(
      public dialogRef: MdDialogRef<DetailEnrollmentDialog>,
      @Inject(MD_DIALOG_DATA) public data: any) {
        this.detailEnrollment=data.selectedObject;
        this.fullName = data.fullName;
       }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
        
    }

  }