import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { UserService } from "../../services/user.service";
import { ListUser } from "./list-user";
import { AddUserDialog } from "./add-user-dialog.component";
import { EditUserDialog } from "./edit-user-dialog.component";

declare var $:any;

//Structure
@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']

})
export class UserComponent{
  userRole;
  users;
  constructor(public addUser: MdDialog, public editUser: MdDialog, public userService: UserService) { }
  

  ngOnInit(listUserService: UserService) {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.userRole = user.role;
        var dataSet = [];
        this.userService.getUsers().subscribe((users => {
        $('#table-user').DataTable( {
         
          data: users,
          columns: [
              { title: "Employee Id", data: "employeeId" },
              { title: "Full Name", data: "fullName" },
              { title: "Email", data: "email" },
              { title: "Job Family", data: "jobFamilyStream" },
              { title: "Grade", data: "grade" },
              { title: "Account Name", data: "accountName" },
              { title: "Active", data: "active" },
              { title: "Role", data: "role" },
              {
                title: "action",
                render: function (data, type, full, meta) {
                  return `<button class="action-button" id="edit-button" data-element-id="${full.employeeId}" style="background-color: transparent; border: white;">
                            <img class="image-button" src="../../assets/image/edit.svg" style="width: 15px;height: 15px;">
                          </button>`
              }
            }
          ],
          columnDefs: [
            {
              render: function (data, type, full, meta) {
                  return "<div style='text-align:center;'>" + data + "</div>";
              },
              targets: '_all'
            },
            {
              render: function (data, type, full, meta) {
                  return "<div style='white-space:normal; width:70px; text-align:left;'>" + data + "</div>";
              },
              targets: [0]
            }
         ]
      } );
      var that = this;
      $('#table-user').on('click', '#edit-button', function() {
        let employeeId = $(this).data('element-id');
        that.openDialogEdit(employeeId);
      } );
    }));
  }
  

  openDialogEdit(employeeId: number): void {
    //alert("open dialog");
    let dialogRef = this.editUser.open(EditUserDialog, {
      width: '45%',
      data: { employeeId:  employeeId}
    });
  }

  openDialogAdd(): void {
    //alert("open dialog");
    let dialogRef = this.addUser.open(AddUserDialog, {
      width: '50%'
    });
  }

}
