import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../services/period.service";
import { Periods } from "./period";
import { AddPeriodDialog } from "./add-period-dialog";
import { DeletePeriodDialog } from "./delete-period-dialog";


declare var $:any;

@Component({
  templateUrl: './list-period.component.html',
  styleUrls: ['./period.component.css']
})
export class ListPeriodComponent {
    userRole;
    activeRole;
    periods;
    //for adding period
    // trainingName;
    // startDate;
    // endDate;
    show;
    constructor(public addPeriod: MdDialog, public deletePeriod: MdDialog, public periodSerice: PeriodService, private router: Router) { }
  
    ngOnInit(periodSerice: PeriodService) {

          var user = JSON.parse(localStorage.getItem('currentUser'));
          this.userRole = user.role;
          this.activeRole = localStorage.getItem('activeRole');
          var dataSet = [];
          this.periodSerice.getPeriods().subscribe((periods => {
  
          $('#period-table').DataTable( {
           
            data: periods,
            columns: [
                { title: "Training", data : "trainingName" },
                { title: "Active", data : "activeStatus" },
                { title: "# of Course", data : "coursesCount" },
                { title: "Start Date", data : "startDate" },
                { title: "End Date", data : "endDate" },
                { title: "Created By", data : "createdBy" },
                { title: "Edited By", data : "editedBy" },
                {
                  title: "action",
                  render: function (data, type, full, meta) {
                  return `<button class="action-button" id="edit-button" data-element-id="${full.trainingPeriodId}" style="background-color: transparent; border: white;">
                            <img class="image-button" src="../../assets/image/edit.svg" style="width: 15px;height: 15px;">
                          </button>
                          <button class="action-button" id="participants-button" data-element-id="${full.trainingPeriodId}" style="background-color: transparent; border: white;">
                            <img class="image-button" src="../../assets/image/participants.svg" style="width: 15px;height: 15px;">
                          </button>
                          <button class="action-button" id="schedules-button" data-element-id="${full.trainingPeriodId}" style="background-color: transparent; border: white;">
                            <img class="image-button" src="../../assets/image/schedule.svg" style="width: 15px;height: 15px;">
                          </button>
                          <button class="action-button" id="delete-button" data-element-id="${full.trainingPeriodId}" style="background-color: transparent; border: white;">
                            <img class="image-button" src="../../assets/image/garbage.svg" style="width: 15px;height: 15px;">
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
              }
           ]
        } );
        var that = this;
        $('#period-table').on('click', '#edit-button', function() {
          let trainingId = $(this).data('element-id');
          that.router.navigate(['/home/period/edit/', trainingId]);
        } );

        $('#period-table').on('click', '#participants-button', function() {
          let trainingId = $(this).data('element-id');
          that.router.navigate(['/home/period/edit', trainingId,'eligible']);
        } );

        $('#period-table').on('click', '#schedules-button', function() {
          let trainingId = $(this).data('element-id');
          that.router.navigate(['/home/period/edit', trainingId, 'schedule']);
        } );
    
        // Delete a record
        $('#period-table').on('click', '#delete-button', function () {
          let trainingId = $(this).data('element-id'); 
          that.openDialogDelete(trainingId);
        } );
      }));
    }
    openDialogAdd(): void {
      let dialogRef = this.addPeriod.open(AddPeriodDialog, {
        width: '40%',
        // data: { trainingName: "" }
      });
  
      // dialogRef.afterClosed().subscribe(result => {
      //   this.trainingName = result.trainingName;
      //   this.startDate = result.startDate;
      //   this.endDate = result.endDate;
      // });
    }
    
    openDialogDelete(trainingId) {
      this.deletePeriod.open(DeletePeriodDialog, {
        data: { id: trainingId }
      });
    }
    
}