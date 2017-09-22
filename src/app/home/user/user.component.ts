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
import { ListUserService } from "../../services/list-user.service";
import { ListUser } from "./list-user";
import { AddUserDialog } from "./add-user-dialog.component";

declare var $:any;

//Structure
@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']

})
export class UserComponent{
  userRole;
  users;
  constructor(public addUser: MdDialog, public listUserService: ListUserService) { }
  

  ngOnInit(listUserService: ListUserService) {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.userRole = user.role;
        var dataSet = [];
        this.listUserService.getUsers().subscribe((users => {
          $.each(users, (i, item) => {
            dataSet[i] = $.map(item, function(el) { return el; })
          });
          $('#example').on('click', 'a.editor_edit', function (e) {
            e.preventDefault();
        } );
     
        // Delete a record
        $('#example').on('click', 'a.editor_remove', function (e) {
            e.preventDefault();
        } );

        $('#example').DataTable( {
         
          data: dataSet,
          columns: [
              { title: "Employee Id" },
              { title: "Full Name" },
              { title: "Email" },
              { title: "Job Family" },
              { title: "Grade" },
              { title: "Account Name" },
              { title: "Active" },
              { title: "Role" },
              {
                title: "action",
                defaultContent: '<a href="" class="editor_edit"><button class="action-button" style="background-color: transparent; border: white;"><img class="image-button" src="../../assets/image/edit.svg" style="width: 15px;height: 15px; color:#009688"></button></a> <a href="" ><button class="action-button" style="background-color: transparent; border: white;"><img class="image-button" src="../../assets/image/garbage.svg" style="width: 15px;height: 15px;"></button></a>'
              }
          ]
      } );
    }));
  }
  

  // openDialogAdd(): void {
  //   let dialogRef = this.addUser.open(AddUserDialog, {
  //     width: '80%',
  //     data: {  }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //   });
  // }

}
