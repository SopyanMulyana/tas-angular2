import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator, MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { AchievementService } from "../../services/achievement.service";
import { PeriodService } from "../../services/period.service";
import { Periods } from "../period/period";
import { PostAchievement } from "./achievement-post";



@Component({
    templateUrl: 'edit-achievement-dialog.html',
    styleUrls: ['./achievement.component.css']
  })
  export class EditAchievementDialog implements OnInit{
    
    finalData: PostAchievement[]=[];
    idTraining;
    result;
    idCourse;
    currentAchievement: any ={};
    fullName: string;
    termId : any[]=[];
    termText: any[]=[];
    periodId: any[]=[];
    periodText: any[]=[];
    things = [
      {value: '1', viewValue: 'Not Required'},
      {value: '2', viewValue: 'Term'}
    ];
    periods: Periods[]=[];
    constructor(public snackbar : MdSnackBar,
      public dialogRef: MdDialogRef<EditAchievementDialog>,
      @Inject(MD_DIALOG_DATA) public data: any, private periodService: PeriodService, private achievementService: AchievementService) {
        this.currentAchievement=data.selectedObject;
        var that = this;
        this.periodService.getPeriods().subscribe((periods => {
          console.log(periods);
          that.setPeriod(periods);
        
          if (this.currentAchievement.beginingId==0){
            this.termText[1]="Not Required";
          }
          else if (this.currentAchievement.beginingId>=1){
            this.termText[1]="Term";
            this.getTrainingName(1,this.currentAchievement.beginingId);
          }
          if (this.currentAchievement.li1Id==0){
            this.termText[2]="Not Required";
          }
          else if (this.currentAchievement.li1Id>=1){
            this.termText[2]="Term";
            this.getTrainingName(2,this.currentAchievement.li1Id);
          }
          if (this.currentAchievement.li2Id==0){
            this.termText[3]="Not Required";
          }
          else if (this.currentAchievement.li2Id>=1){
            this.termText[3]="Term";
            this.getTrainingName(2,this.currentAchievement.li2Id);
          }
          if (this.currentAchievement.int1Id==0){
            this.termText[4]="Not Required";
          }
          else if (this.currentAchievement.int1Id>=1){
            this.termText[4]="Term";
            this.getTrainingName(2,this.currentAchievement.int1Id);
          }
          if (this.currentAchievement.int2Id==0){
            this.termText[5]="Not Required";
          }
          else if (this.currentAchievement.int2Id>=1){
            this.termText[5]="Term";
            this.getTrainingName(2,this.currentAchievement.int2Id);
          }
          if (this.currentAchievement.bw1Id==0){
            this.termText[6]="Not Required";
          }
          else if (this.currentAchievement.bw1Id>=1){
            this.termText[6]="Term";
            this.getTrainingName(2,this.currentAchievement.bw1Id);
          }
          if (this.currentAchievement.ce1Id==0){
            this.termText[7]="Not Required";
          }
          else if (this.currentAchievement.ce1Id>=1){
            this.termText[7]="Term";
            this.getTrainingName(2,this.currentAchievement.ce1Id);
          }
          if (this.currentAchievement.bw2Id==0){
            this.termText[8]="Not Required";
          }
          else if (this.currentAchievement.bw2Id>=1){
            this.termText[8]="Term";
            this.getTrainingName(2,this.currentAchievement.bw2Id);
          }
          if (this.currentAchievement.ce2Id==0){
            this.termText[9]="Not Required";
          }
          else if (this.currentAchievement.ce2Id>=1){
            this.termText[9]="Term";
            this.getTrainingName(2,this.currentAchievement.ce2Id);
          }
          if (this.currentAchievement.presentationSkillId==0){
            this.termText[10]="Not Required";
          }
          else if (this.currentAchievement.presentationSkillId>=1){
            this.termText[10]="Term";
            this.getTrainingName(2,this.currentAchievement.presentationSkillId);
          }
        }));
        
        
        this.fullName = data.fullName;
       }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    getTrainingName(index,id) {
      this.periods.forEach( e => {
        if(e.trainingPeriodId === id) {
          console.log(e.trainingName);
          this.periodText[index]= e.trainingName;
          this.periodId[index]= e.trainingPeriodId;
        }
      })
    }
    ngOnInit(){
    }
    setPeriod(periods){
      this.periods=periods;
    }
    changeValue(id:number,idValue:number,viewValue){
      this.termId[id]=idValue;
      this.termText[id]=viewValue;
      console.log(id);
    }
    changeValuePeriod(id:number,idValue:number,viewValue){
      this.periodId[id]=idValue;
      this.periodText[id]=viewValue;
      console.log(id);
    }
    saveAchievement(){
      for (var index = 1; index < 10; index++) {
        if (this.termId[index]!=null){
          this.finalData.push({bccId: index, status: this.termId[index], term: this.periodId[index]});
        }
      }
      this.achievementService.editAchievement(this.currentAchievement.employeeId,this.finalData).subscribe(((res) => {
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
        this.dialogRef.close();
    }

  }