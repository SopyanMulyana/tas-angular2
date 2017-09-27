import { Component, ElementRef, Inject, ViewChild, OnInit, OnChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../../services/period.service";


declare var $:any;

@Component({
  templateUrl: 'schedule-list.component.html',
  styleUrls: ['../period.component.css']
})
export class ScheduleListComponent implements OnInit{

  // constructor(public periodSerice: PeriodService, private router: Router) {
  //   this.curentData = periodSerice.getPeriodById()
  //  }
  trainingId: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private periodService: PeriodService, private router: Router) {

  }
  ngOnInit() {
    // edit period
    this.sub = this.route.params.subscribe(params => {
       this.trainingId = +params['trainingId']; // (+) converts string 'id' to a number
     
   // here the code
    });
    //elligible participants
    
  }
}