import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms'
import { routing } from "./app.routes"
import { HttpModule } from '@angular/http';

import 'hammerjs';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent, ChangeRoleDialog } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
//import { PeriodComponent } from './home/period/period.component';
import { PeriodComponent } from './home/period/period.component';
import { AddPeriodDialog } from "./home/period/add-period-dialog";
import { DeletePeriodDialog } from "./home/period/delete-period-dialog";
import { ListPeriodComponent } from "./home/period/list-period.component";
import { EditPeriodComponent } from "./home/period/edit-period.component";
import { EditPeriodListComponent } from "./home/period/editperiod/edit-period-list.component";
import { EligibleParticipantsComponent } from "./home/period/eligibleparticipants/eligible-participants.component";
import { AddEligibleDialog } from "./home/period/eligibleparticipants/add-eligible-participants";
import { DeleteEligibleDialog } from "./home/period/eligibleparticipants/delete-eligible-participants";
import { ScheduleListComponent } from "./home/period/schedulelist/schedule-list.component";
import { DeleteCourseDialog } from "./home/period/schedulelist/delete-course";
import { AddCourseDialog } from "./home/period/schedulelist/add-course";
import { DetailDialog } from "./home/period/schedulelist/detail-course";
import { AddEnrollDialog } from "./home/period/schedulelist/enroll-participants";
import { EditScheduleDialog } from "./home/period/schedulelist/edit-schedule-dialog";
import { ScheduleListOutletComponent } from "./home/period/schedulelist/edit-schedule.component";
import { UpdateScheduleComponent } from "./home/period/schedulelist/update-schedule.component";
// import { UserComponent, AddUserDialog } from './home/user/user.component';
import { UserComponent } from './home/user/user.component';
import { AddUserDialog } from './home/user/add-user-dialog.component';
import { EnrollmentComponent } from './home/enrollment/enrollment.component';
import { AchievementComponent } from './home/achievement/achievement.component';
import { MaintenanceComponent } from './home/maintenance/maintenance.component';
import { AlertComponent } from './alert.component';

import { AuthGuard } from './services/authguard.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { ListUserService } from "./services/list-user.service";
import { PeriodService } from "./services/period.service";
import { UrlService } from './services/url.service';
// used to create fake backend
// import { fakeBackendProvider } from './fakebackend';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChangeRoleDialog,
    DashboardComponent,
    PeriodComponent,
    ListPeriodComponent,
    AddPeriodDialog,
    DeletePeriodDialog,
    EditPeriodComponent,
    EditPeriodListComponent,
    EligibleParticipantsComponent,
    AddEligibleDialog,
    DeleteEligibleDialog,
    ScheduleListComponent,
    DeleteCourseDialog,
    AddCourseDialog,
    UserComponent,
    AddUserDialog,
    EnrollmentComponent,
    AchievementComponent,
    MaintenanceComponent,
    AlertComponent,
    DetailDialog,
    AddEnrollDialog,
    EditScheduleDialog,
    ScheduleListOutletComponent,
    UpdateScheduleComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    routing,
    HttpModule
  ],
  providers: [AuthGuard,
    AuthenticationService,
    UserService,
    AlertService,
    ListUserService,
    PeriodService,
    UrlService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPeriodDialog, DeletePeriodDialog,
    AddUserDialog, ChangeRoleDialog, AddEligibleDialog,
    DeleteEligibleDialog, DeleteCourseDialog, AddCourseDialog, DetailDialog, AddEnrollDialog,
    EditScheduleDialog
  ]
})
export class AppModule { }
