import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UrlService {
   constructor() {
   }
   serverUrl: string ="http://mtpc583:8080/api";
   getUrlUsers(): string {
      return this.serverUrl + "/secure/user/";
   }

   getUrlUserById(id: number): string {
       return this.serverUrl + "/secure/user/"+id;
   }

   postUrlAddUser(): string {
       return this.serverUrl + "/secure/user/add/";
   }

   getUrlGrade(): string {
       return this.serverUrl + "/secure/user/grade/";
   }

   getUrlLocation(): string {
       return this.serverUrl + "/secure/user/location/";
   }

   postUrlEditActiveUser(idUser: number): string {
       return this.serverUrl + "/secure/user/"+idUser+"/edit/active/";
   }

   postUrlEditRolesUser(idUser: number): string {
       return this.serverUrl + "/secure/user/"+idUser+"/edit/roles/";
   }

   getUrlAuth(): string {
       return this.serverUrl + "/auth/";
   }

   getUrlPeriod(): string {
       return this.serverUrl + "/secure/period/";
   }

   postPeriodData(): string {
        return this.serverUrl + "/secure/period/add/"
   }

   postEditPeriod(id: number): string {
       return this.serverUrl + "/secure/period/"+id+"/edit/";
   }

   deleteUrlPeriod(id:number): string {
       return this.serverUrl + "/secure/period/"+id+"/delete/";
   }

   getUrlElligibleParticipants(id:number): string {
        return this.serverUrl + "/secure/period/"+id+"/eligible/";

   }

   getUrlListUserForElligibleParticipants(id:number): string {
       return this.serverUrl + "/secure/user/eligible/"+id;
   }

   postElligibleParticipant(id:number): string {
       return this.serverUrl + "/secure/period/"+id+"/eligible/add/";
   }

   deleteUrlElligibleParticipant(id:number, participantsId): string {
        return this.serverUrl + "/secure/period/"+id+"/eligible/delete/"+participantsId;
    }

   getUrlCourseList(id:number): string {
       return this.serverUrl + "/secure/period/"+id+"/course";
    }

    deleteUrlCourseList(id:number, courseId:number): string {
        return this.serverUrl + "/secure/period/"+id+"/course/delete/"+courseId;
    }

   postUrlAddCourse(id:number): string {
       return this.serverUrl + "/secure/period/"+id+"/course/add";
   }

   getUrlListTrainer(): string {
    return this.serverUrl + "/secure/user/trainer";
   }

   getUrlListForAddCourse(): string {
       return this.serverUrl + "/secure/period/course";
   }

   getUrlClassRoom(): string {
        return this.serverUrl + "/secure/period/classroom";
    }

   getUrlDetailCourse(idTraining: number, idCourse: number): string {
       return this.serverUrl + "/secure/period/"+idTraining+"/course/"+idCourse;
   } 

   postEditCourse(idTraining:number, idCourse:number): string {
    return this.serverUrl + "/secure/period/"+idTraining+"/course/"+idCourse+"/edit"; 
    }

   getUrlListUserForEnrollParticipants(idTraining:number, idCourse:number): string {
        return this.serverUrl + "/secure/period/"+idTraining+"/course/"+idCourse+"/eligible/"; 
    }

    postEnrollParticipant(idTraining:number, idCourse:number): string {
        return this.serverUrl + "/secure/period/"+idTraining+"/course/"+idCourse+"/eligible/add"; 
    }

    getUrlEnrollment(): string {
        return this.serverUrl + "/secure/enrollment";
    }

    getUrlAchievementList(idRole:number): string {
        return this.serverUrl + "/secure/achievement/"+idRole;
    }

    postUrlEditAchievement(idUser:number): string {
        return this.serverUrl + "/secure/achievement/"+idUser+"/edit";
    }

    getUrlMaintenancetList(activeRole: number): string {
        return this.serverUrl + "/secure/maintenance/"+activeRole; 
    }

    getUrlAttendanceList(id:number): string {
        return this.serverUrl + "/secure/maintenance/"+id+"/attendance/";
    }

    getUrlListPersonForAttendance(coursePeriodId:number, scheduleId: number): string {
        return this.serverUrl + "/secure/maintenance/"+coursePeriodId+"/attendance/"+scheduleId;
    }

    postUrlEditAttendance(coursePeriodId:number, scheduleId: number): string {
        return this.serverUrl + "/secure/maintenance/"+coursePeriodId+"/attendance/"+scheduleId+"/edit";
    }

    getUrlListPersonForAssessment(coursePeriodId:number): string {
        return this.serverUrl + "/secure/maintenance/"+coursePeriodId+"/assessment/";
    }

    postUrlEditAssessment(coursePeriodId:number): string {
        return this.serverUrl + "/secure/maintenance/"+coursePeriodId+"/assessment/edit";
    }
    
   getUrlActiveTraining(): string {
        return this.serverUrl + "/secure/dashboard/active";
   }

   getUrlBCCShedule(): string {
        return this.serverUrl + "/secure/dashboard/bcc";
   }
   


}