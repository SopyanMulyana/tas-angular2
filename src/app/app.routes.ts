import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './home/dashboard/dashboard.component'
import { PeriodComponent } from './home/period/period.component';
import { ListPeriodComponent } from "./home/period/list-period.component";
import { EditPeriodComponent } from "./home/period/edit-period.component";
import { EditPeriodListComponent } from "./home/period/editperiod/edit-period-list.component";
import { EligibleParticipantsComponent } from "./home/period/eligibleparticipants/eligible-participants.component";
import { ScheduleListComponent } from "./home/period/schedulelist/schedule-list.component";
import { UserComponent } from './home/user/user.component'
import { EnrollmentComponent } from './home/enrollment/enrollment.component'
import { AchievementComponent } from './home/achievement/achievement.component'
import { MaintenanceComponent } from "./home/maintenance/maintenance.component";
import { ScheduleListOutletComponent } from "./home/period/schedulelist/edit-schedule.component";
import { UpdateScheduleComponent } from "./home/period/schedulelist/update-schedule.component";

import { AuthGuard } from './services/authguard.service';

const routes: Routes = [
    { path: 'login',       component: LoginComponent },
    { path: 'home',        component: HomeComponent, 
        canActivate: [AuthGuard],
        children: [
            {path: '',              component: DashboardComponent},
            {path: 'period',        component: PeriodComponent, children:[
                {path: '',          component: ListPeriodComponent},
                {path: 'edit',      component: EditPeriodComponent, children:[
                    {path: ':trainingId/:periodical',               component: EditPeriodListComponent},
                    {path: ':trainingId/:periodical/eligible',      component: EligibleParticipantsComponent},
                    {path: ':trainingId/:periodical/schedule',      component: ScheduleListComponent},
                    {path: ':trainingId/:periodical/schedule/', component:UpdateScheduleComponent}
                    // {path: ':trainingId/schedule',      component: ScheduleListOutletComponent, children:[
                    //     {path:'',                               component: ScheduleListComponent},
                    //     {path:':periodical',        component: UpdateScheduleComponent}
                    // ]}
                ]}
            ]},
            {path: 'user',          component: UserComponent},
            {path: 'enrollment',    component: EnrollmentComponent},
            {path: 'achievement',   component: AchievementComponent},
            {path: 'maintenance',   component: MaintenanceComponent}
    ]},

    //if any path then redirect to home
    {path: '**', redirectTo:'home'}
];

export const routing = RouterModule.forRoot(routes);