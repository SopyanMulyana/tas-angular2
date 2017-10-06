import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator, MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { UserService } from "../../services/user.service";
import { AddUsers } from "./add-user";
import { ListGrade } from "./grade";
import { ListLocation } from "./location";

@Component({
    templateUrl: 'add-user-dialog.component.html',
    styleUrls: ['./user.component.css']
  })
  export class AddUserDialog implements OnInit{
    addPeriodFormControl = new FormControl('', [
      Validators.required
    ]);
    addUser: AddUsers;
    locations: ListLocation[];
    grades: ListGrade[];
    temporaryData: any={} ;
    result;
    constructor(public snackbar : MdSnackBar, 
      public dialogRef: MdDialogRef<AddUserDialog>,
      @Inject(MD_DIALOG_DATA) public data: any, public userService: UserService) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
      this.userService.getGrades().subscribe(res => 
        this.grades = res);
      this.userService.getLocations().subscribe(res => 
        this.locations = res);
    }
    saveUser(): void {
      this.addUser = new AddUsers(this.temporaryData.accountName,
        this.temporaryData.password, this.temporaryData.fullName, 
        this.temporaryData.gradeId, this.temporaryData.stream , this.temporaryData.email, this.temporaryData.locationId);
      console.log(this.addUser);
        this.userService.createDataUser(this.addUser).subscribe(((res) => {
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