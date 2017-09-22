import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { PeriodService } from "../../services/period.service";
import { Periods } from "./period";

@Component({
    templateUrl: 'add-period-dialog.html',
    styleUrls: ['./period.component.css']
  })
  export class AddPeriodDialog {
    addPeriodFormControl = new FormControl('', [
      Validators.required
    ]);
  
    constructor(
      public dialogRef: MdDialogRef<AddPeriodDialog>,
      @Inject(MD_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }