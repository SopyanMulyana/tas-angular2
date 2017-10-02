import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { UserService } from "../../services/user.service";
import { AddUsers } from "./add-user";
import { ListUser } from "./list-user";
import { ListGrade } from "./grade";
import { ListLocation } from "./location";
import { AddRole } from "./edit-roles";
import { AddActive } from "./edit-active";

@Component({
    templateUrl: 'edit-user-dialog.component.html',
    styleUrls: ['./user.component.css']
  })
  export class EditUserDialog implements OnInit{
    addPeriodFormControl = new FormControl('', [
      Validators.required
    ]);

    
    currentData: any={};
    employeeId: number;
    finalRoles: AddRole[]=[];
    finalActive: AddActive;
    result;
    roles: any[]=[false, false, false, false];
    constructor(
      public dialogRef: MdDialogRef<EditUserDialog>,
      @Inject(MD_DIALOG_DATA) public data: any, public userService: UserService) {
          this.employeeId=data.employeeId;
       }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
      this.userService.getUserById(this.employeeId).subscribe(res => 
        {this.currentData.accountName = res.accountName;
        this.currentData.active = res.active.toString();
        for (let i = 0; i <= res.role.length; i++) { 
            console.log(res.role[i]);
            if (res.role[i].toString()== "1")
            { this.roles[0]=true;}
            else if (res.role[i].toString()=="2")
            { this.roles[1]=true;}
            else if (res.role[i].toString()=="3")
            { this.roles[2]=true; }
            else if (res.role[i].toString()=="4")
            { this.roles[3]=true;}
        }
        }
    );
    }
    saveUser(): void {
        alert(this.roles)
        for (let i = 0; i <= this.roles.length; i++) { 
            if (this.roles[i]==true)
            { 
                this.finalRoles.push({roleId: i+1});}
        }
        console.log(this.finalRoles);
        console.log(this.currentData);
            
        this.finalActive = {active: this.currentData.active};
        this.userService.editDataActiveUser(this.employeeId, this.finalActive).subscribe(((res) => {
        this.result = res;
        if(this.result == true){
            console.log(this.result);
        //this.notificationService.setNotificationInfo('Period success to created');
        }else{
        //this.notificationService.setNotificationError('Period failed to created !');
        console.log(this.result);
        }
        })); 
        this.userService.editDataRolesUser(this.employeeId, this.finalRoles).subscribe(((res) => {
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