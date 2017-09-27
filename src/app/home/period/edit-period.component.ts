import { Component, ElementRef, Inject, ViewChild, OnInit, OnChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../services/period.service";
import { Periods } from "./period";
import { AddPeriods } from "./add-period";

declare var $:any;

@Component({
  templateUrl: 'edit-period.component.html',
  styleUrls: ['./period.component.css']
})
export class EditPeriodComponent{
  
}