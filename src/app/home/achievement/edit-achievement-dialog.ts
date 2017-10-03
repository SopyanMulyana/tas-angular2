import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
// import { PeriodService } from "../../../services/period.service";



@Component({
    templateUrl: 'edit-achievement-dialog.html',
    styleUrls: ['./achievement.component.css']
  })
  export class EditAchievementDialog implements OnInit{
    
    idTraining;
    idCourse;
    currentAchievement: any ={};
    fullName: string;
    constructor(
      public dialogRef: MdDialogRef<EditAchievementDialog>,
      @Inject(MD_DIALOG_DATA) public data: any) {
        this.currentAchievement=data.selectedObject;
        this.fullName = data.fullName;
       }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
        
    }
    saveAchievement(){
      //code here
      alert();
    }

  }