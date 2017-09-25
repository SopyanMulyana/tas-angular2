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
      if(this.router.url === '/home/period/edit'){
        this.show=false;
      console.log(this.show)}
        else {this.show=true;
          console.log(this.show)}

          var user = JSON.parse(localStorage.getItem('currentUser'));
          this.userRole = user.role;
          this.activeRole = localStorage.getItem('activeRole');
          var dataSet = [];
          this.periodSerice.getPeriods().subscribe((periods => {
            $.each(periods, (i, item) => {
              dataSet[i] = $.map(item, function(el) { return el; })
            });
            $('#period-table').on('click', 'a.editor_edit', (e) => {
              this.router.navigateByUrl('/home/period/edit');
          } );
       
          // Delete a record
          $('#period-table').on('click', 'a.editor_remove', function (e) {
              e.preventDefault();
          } );
  
          $('#period-table').DataTable( {
           
            data: dataSet,
            columns: [
                { title: "Training" },
                { title: "Avtive" },
                { title: "# of Course" },
                { title: "Start Date" },
                { title: "End Date" },
                { title: "Created By" },
                { title: "Edited By" },
                {
                  title: "action",
                  defaultContent: '<a class="editor_edit"><button class="action-button" style="background-color: transparent; border: white;"><img class="image-button" src="../../assets/image/edit.svg" style="width: 15px;height: 15px;"></button></a> <a href="" ><button class="action-button" style="background-color: transparent; border: white;"><img class="image-button" src="../../assets/image/garbage.svg" style="width: 15px;height: 15px;"></button></a>'
                }
            ]
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
    
    openDialogDelete() {
      this.deletePeriod.open(DeletePeriodDialog, {
        
      });
    }
    
}