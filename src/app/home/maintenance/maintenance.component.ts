import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MdPaginator, MdSort, MdDialog, MdMenuTrigger } from '@angular/material';
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
import { ListMaintenance } from "./maintenance";
import { ListAttendance } from "./attendance";
// import { ListEditAttendance } from "./edit-attendance-get";

import { MaintenanceService } from "../../services/maintenance.service";
import { AttendanceListDialog } from "./attendance-list-dialog";
import { EditAttendanceDialog } from "./edit-attendance-dialog";

@Component({
  templateUrl: 'maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent {
  fullName;

  

  @ViewChild('filter') filter: ElementRef;
  @ViewChild('filter1') filter1: ElementRef;

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  displayedColumns = ['period', 'courseName', 'trainer', 'room', 'scheduleType', 'startDate', 'endDate', 'numberOfParticipants', 'action'];
  maintenanceDatabase;
  activeRole;
  scheduleId;
  dateAndTime;
  elements:ListAttendance[]=[];
  // listUserToEdit: ListEditAttendance[]=[];
  dataSource: MaintenanceDataSource | null;
  maintenanceDatas:ListMaintenance[];
  constructor(public attendanceListDialog: MdDialog,public editAttendanceDialog: MdDialog, public detailAchievementDialog: MdDialog, private authenticationService: AuthenticationService, private router: Router, private maintenanceService:MaintenanceService) {
   // this.maintenanceDatabase = new MaintenanceDatabase();
   var user = JSON.parse(localStorage.getItem('currentUser'));
   this.activeRole = localStorage.getItem('activeRole');
   if (this.activeRole!=1 && this.activeRole!=2)
   { 
     router.navigate(['/home']);}
   
   this.fullName = user.fullName;
   this.maintenanceService.getMaintenanceList(this.activeRole).subscribe(((maintenanceDatas) => {
    this.maintenanceDatas = maintenanceDatas;

    for (var i = 0; i  < maintenanceDatas.length; i++) {
      this.maintenanceService.getAttendanceList(maintenanceDatas[i].coursePeriodId).subscribe(((attendanceDatas) => {
          this.elements = attendanceDatas;
        }));
    }

    this.maintenanceDatabase = new MaintenanceDatabase(this.maintenanceDatas); 

    this.paginator._length = this.maintenanceDatabase.data.length;
    this.paginator.pageSize = 10;
    this.paginator._pageIndex = 0;

    this.dataSource = new MaintenanceDataSource(this.maintenanceDatabase, this.paginator, this.sort);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.dataSource) { return; }

      this.dataSource.name = this.filter.nativeElement.value;
      this.dataSource.filter = this.filter.nativeElement.value;
   
    });

  

  }));
  }

  openListDialog(maintenance) {
    var that =this;
   
    let dialog1 = this.attendanceListDialog.open(AttendanceListDialog, {
          width: '30%',
          data: {coursePeriodId: maintenance.coursePeriodId, courseName: maintenance.periodName+"/"+maintenance.courseName}
    });

    dialog1.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.scheduleId = result;
      if(this.scheduleId){
        // this.maintenanceService.getListPersonForAttendance(maintenance.coursePeriodId, that.scheduleId).subscribe(((listUserToEdit) => {}));
          // that.listUserToEdit = listUserToEdit;
          that.getTimeAndDate(this.scheduleId);
          // console.log(listUserToEdit);
          let isAssessment=false;
          that.openNew(maintenance.coursePeriodId, that.scheduleId, maintenance, that.dateAndTime, isAssessment);
          
      }
    });
      
  }
  editAssesment(maintenance){
    let isAssessment = true;
    this.openNew(maintenance.coursePeriodId, 0, maintenance, 0, isAssessment);
  }
  openNew(coursePeriodId,scheduleId,maintenance,dateAndTime, isAssessment) {
    this.editAttendanceDialog.open(EditAttendanceDialog, {
      width: '40%',
      disableClose:true,
      data: { periodId: coursePeriodId, scheduleId: scheduleId, courseName: maintenance.periodName+"/"+maintenance.courseName, courseDate: dateAndTime, isAssessment: isAssessment}
});
  }
  getTimeAndDate(id) {
    this.elements.forEach( e => {
      if(e.scheduleId === id) {
        console.log(e.dateAndTime);
        this.dateAndTime= e.dateAndTime;
      }
    })
  }

  
  

  ngOnInit() {
    
  }

}



export class MaintenanceDatabase {
  dataChange: BehaviorSubject<ListMaintenance[]> = new BehaviorSubject<ListMaintenance[]>([]);
  get data(): ListMaintenance[] { return this.dataChange.value; }

  constructor(private maintenanceDatas: ListMaintenance[]) {
    this.dataChange.next(maintenanceDatas);
  }
}

export class MaintenanceDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  public type:string;
  public created:string = "";
  public name:string = "";
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filter123(filter:string,type:string)
  {
    this.type = type;
    this._filterChange.next(filter);
  }
  filteredData: ListMaintenance[] = [];
  renderedData: ListMaintenance[] = [];
  //sortedData: Period[] = [];
  constructor(private _achievementDatabase: MaintenanceDatabase,  private _paginator: MdPaginator,private _sort: MdSort) {
    super();
    this.type = "1";
  }

  connect(): Observable<ListMaintenance[]> {
    const displayDataChanges = [
      this._achievementDatabase.dataChange,
      this._filterChange,
      this._paginator.page,
      this._sort.mdSortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {

     
        this.filteredData = this._achievementDatabase.data.slice().filter((item: ListMaintenance) => {
          let searchStr = (item.courseName).toLowerCase();
          //let searchStr1 = (item.createdDate).toString();
          //return searchStr.indexOf(this.name.toLowerCase()) != -1 && searchStr1.indexOf(this.created.toLowerCase()) != -1;
          return searchStr.indexOf(this.name.toLowerCase()) != -1;
        });
  
       const sortedData = this.getSortedData(this.filteredData.slice());
       const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
       this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
  
        return this.renderedData;

    });
  }

  disconnect() {}

  
  getSortedData(data: ListMaintenance[]): ListMaintenance[] {
    //const data = this._achievementDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'courseName': [propertyA, propertyB] = [a.courseName, b.courseName]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
