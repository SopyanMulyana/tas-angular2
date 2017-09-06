import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
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


//Structure
@Component({
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent {
  userRole;
  displayedColumns = ['trainingName', 'activeStatus', 'coursesCount', 'startDate', 'endDate', 'createdBy', 'editedBy', 'action'];
  periodDatabase = new PeriodDatabase();
  dataSource: PeriodDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;
  
  ngOnInit() {
    this.dataSource = new PeriodDataSource(this.periodDatabase, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.userRole = user.role;
  }
  
  trainingName: string;
  startDate: string;
  endDate: string;
  

  constructor(public addPeriod: MdDialog, public deletePeriod: MdDialog) {}

  openDialogAdd(): void {
    let dialogRef = this.addPeriod.open(AddPeriodDialog, {
      width: '40%',
      data: { trainingName: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.trainingName = result.trainingName;
      this.startDate = result.startDate;
      this.endDate = result.endDate;
    });
  }
  
  openDialogDelete() {
    this.deletePeriod.open(DeletePeriodDialog, {
      
    });
  }
}

//Add Period dialog
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

@Component({
  templateUrl: 'delete-period.component.html',
  styleUrls: ['./period.component.css']
})
export class DeletePeriodDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) {}
}

//table
export interface Period {
  trainingName: string;
  activeStatus: boolean;
  coursesCount: number;
  startDate: string;
  endDate: string;
  createdBy: string;
  editedBy: string;
}

export class PeriodDatabase {
  dataChange: BehaviorSubject<Period[]> = new BehaviorSubject<Period[]>([]);
  get data(): Period[] { return this.dataChange.value; }

  constructor() {
    this.dataChange.next([
      {trainingName: 'ASP .NET', activeStatus: true , coursesCount: 3 , startDate:'10-11-2017', endDate:'20-10-2017', createdBy:"Yuliawan Rizka", editedBy: "Yuliawan Rizka"},
      {trainingName: 'ASP .NET', activeStatus: false , coursesCount: 3 , startDate:'10-11-2017', endDate:'20-10-2017', createdBy:"Yuliawan Rizka", editedBy: "Lynx"},
      {trainingName: 'Angular 2', activeStatus: false , coursesCount: 3 , startDate:'10-11-2017', endDate:'20-10-2017', createdBy:"Lynx", editedBy: "Lynx"},
      {trainingName: 'NodeJS', activeStatus: true , coursesCount: 8 , startDate:'10-11-2016', endDate:'20-10-2016', createdBy:"Yuliawan Rizka", editedBy: "Yuliawan Rizka"}
    ]);
  }
}

export class PeriodDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: Period[] = [];
  renderedData: Period[] = [];
  constructor(private _periodDatabase: PeriodDatabase, private _paginator: MdPaginator) {
    super();
  }
  connect(): Observable<Period[]> {
    const displayDataChanges = [
      this._periodDatabase.dataChange,
      this._filterChange,
      this._paginator.page,
    ];


    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this._periodDatabase.data.slice().filter((item: Period) => {
        let searchStr = (item.trainingName + item.startDate + item.endDate + item.createdBy + item.editedBy).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });


      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = this.filteredData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {}
}