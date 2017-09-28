import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from "./role";
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fullName;
  userRole;
  activeRole;
  roles: Role[] = [];
  constructor (private authenticationService: AuthenticationService,
                private router: Router, public dialog: MdDialog){ 
                  var user = JSON.parse(localStorage.getItem('currentUser'));
                  this.fullName = user.fullName;
                  this.userRole = user.role;
                  this.activeRole = localStorage.getItem('activeRole');

                  for (let i = 0; i <= this.userRole.length; i++) { 
                   if (this.userRole[i]==1)
                   { this.roles.push({idRole: this.userRole[i], value: 'Administrator'});}
                   else if (this.userRole[i]==2)
                   { this.roles.push({idRole: this.userRole[i], value: 'Trainer'});}
                   else if (this.userRole[i]==3)
                   { this.roles.push({idRole: this.userRole[i], value: 'Manager'}); }
                   else if (this.userRole[i]==4)
                   { this.roles.push({idRole: this.userRole[i], value: 'Participants'});}
                    }
                  }
  logout(){
    this.authenticationService.logout();
  }
  changeRole(userRole): void {
    localStorage.setItem('activeRole',userRole);
    console.log(userRole);
    window.location.reload();
  }
  // openDialog(): void {
  //   let dialogRef = this.dialog.open(ChangeRoleDialog, {
  //     width: '250px'
      
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     //this.userRole = result;
  //   });
  // }
}

@Component({
  templateUrl: 'change-role.component.html',
})
export class ChangeRoleDialog {
  userRole;
  constructor(
    public dialogRef: MdDialogRef<ChangeRoleDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { 
      this.userRole = localStorage.getItem('userRole');
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  changeRole(): void {
    // localStorage.setItem('activeRole','4');
    console.log(this.userRole);
    this.dialogRef.close();
  }
}
