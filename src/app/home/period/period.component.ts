import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { PeriodService } from "../../services/period.service";
import { Periods } from "./period";

declare var $:any;
//Structure
@Component({
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent {
}
