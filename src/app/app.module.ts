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
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PeriodComponent, AddPeriodDialog, DeletePeriodDialog } from './home/period/period.component';
// import { UserComponent, AddUserDialog } from './home/user/user.component';
import { UserComponent } from './home/user/user.component';
import { EnrollmentComponent } from './home/enrollment/enrollment.component';
import { AchievementComponent } from './home/achievement/achievement.component';
import { MaintenanceComponent } from './home/maintenance/maintenance.component';
import { AlertComponent } from './alert.component';

import { AuthGuard } from './services/authguard.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { ListUserService } from "./services/list-user.service";
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
    DashboardComponent,
    PeriodComponent,
    AddPeriodDialog,
    DeletePeriodDialog,
    UserComponent,
    // AddUserDialog,
    EnrollmentComponent,
    AchievementComponent,
    MaintenanceComponent,
    AlertComponent
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
    UrlService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddPeriodDialog, DeletePeriodDialog,
    // AddUserDialog
  ]
})
export class AppModule { }
