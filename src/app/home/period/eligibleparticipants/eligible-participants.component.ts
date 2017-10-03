import { Component, ElementRef, Inject, ViewChild, OnInit, OnChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../../services/period.service";
import { AddEligibleDialog } from "./add-eligible-participants";
import { DeleteEligibleDialog } from "./delete-eligible-participants";


declare var $:any;

@Component({
  templateUrl: 'eligible-participants.component.html',
  styleUrls: ['../period.component.css']
})
export class EligibleParticipantsComponent implements OnInit{

  // constructor(public periodSerice: PeriodService, private router: Router) {
  //   this.curentData = periodSerice.getPeriodById()
  //  }
  trainingId: number;
  private sub: any;
  activeRole;

  constructor(public addEligible: MdDialog, public deleteEligible: MdDialog, private route: ActivatedRoute, private periodService: PeriodService, private router: Router) {
    this.activeRole = localStorage.getItem('activeRole');
    if (this.activeRole!=1)
    { router.navigate(['/home']);}
  }
  ngOnInit() {
    // edit period
    this.sub = this.route.params.subscribe(params => {
        // console.log(params['trainingId']);
       this.trainingId = +params['trainingId']; // (+) converts string 'id' to a number
        this.periodService.getElligibleParticipants(this.trainingId).subscribe((elligibleparticipants => {
          $('#elligible-participants-table').DataTable( {
            
            data: elligibleparticipants,
            columns: [
                { title: "Employee Name", data : "fullName" },
                {
                  title: "action",
                  render: function (data, type, full, meta) {
                  return `<button class="action-button" id="delete-button" data-element-id="${full.id}" style="background-color: transparent; border: white;">
                            <img class="image-button" src="../../assets/image/garbage.svg" style="width: 15px;height: 15px;">
                          </button>`
                  }
                }
            ],
            columnDefs: [
              {
                render: function (data, type, full, meta) {
                    return "<div style='text-align:left;'>" + data + "</div>";
                },
                targets: '_all'
              }
           ]
        }); //console.log(elligibleparticipants);
        var that = this;
        $('#elligible-participants-table').on('click', '#delete-button', function () {
          let participantsId = $(this).data('element-id'); 
          that.openDialogDelete(participantsId);
        } );
        }));
    });
    //elligible participants
    
  }
  openDialog(): void {
    let dialogRef = this.addEligible.open(AddEligibleDialog, {
      width: '80%',
      data: { id: this.trainingId }
    });
  }
  openDialogDelete(participantsId) {
    this.deleteEligible.open(DeleteEligibleDialog, {
      data: { trainingId: this.trainingId, participantsId: participantsId }
    });
  }
}