import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UrlService {
   constructor() {
   }
 
   getUrlUsers(): string {
      return "http://mtpc583:8080/api/secure/user/";
   }

   getUrlUserById(id: number): string {
       return "http://mtpc583:8080/api/secure/user/"+id;
   }

   postUrlAddUser(): string {
       return "http://mtpc583:8080/api/secure/user/add/";
   }

   getUrlGrade(): string {
       return "http://mtpc583:8080/api/secure/user/grade/";
   }

   getUrlLocation(): string {
       return "http://mtpc583:8080/api/secure/user/location/";
   }

   postUrlEditActiveUser(idUser: number): string {
       return "http://mtpc583:8080/api/secure/user/"+idUser+"/edit/active/";
   }

   postUrlEditRolesUser(idUser: number): string {
       return "http://mtpc583:8080/api/secure/user/"+idUser+"/edit/roles/";
   }

   getUrlAuth(): string {
       return "http://mtpc583:8080/api/auth/";
   }

   getUrlPeriod(): string {
       return "http://mtpc583:8080/api/secure/period/";
   }

   postPeriodData(): string {
    //    return "http://mtpc659:8080/period/create"; //wimba
        return "http://mtpc583:8080/api/secure/period/add/"
   }

   postEditPeriod(id: number): string {
       return "http://mtpc583:8080/api/secure/period/"+id+"/edit/";
   }

   deleteUrlPeriod(id:number): string {
       return "http://mtpc583:8080/api/secure/period/"+id+"/delete/";
   }

   getUrlElligibleParticipants(id:number): string {
    //    return "http://mtpc659:8080/eligibleparticipant/findByTraining/"+id; //wimba
        return "http://mtpc583:8080/api/secure/period/"+id+"/eligible/";

   }

   getUrlListUserForElligibleParticipants(id:number): string {
       return "http://mtpc583:8080/api/secure/user/eligible/"+id;
   }

   postElligibleParticipant(id:number): string {
       return "http://mtpc583:8080/api/secure/period/"+id+"/eligible/add/";
   }

   deleteUrlElligibleParticipant(id:number, participantsId): string {
        return "http://mtpc583:8080/api/secure/period/"+id+"/eligible/delete/"+participantsId;
    }

   getUrlCourseList(id:number): string {
       return "http://mtpc583:8080/api/secure/period/"+id+"/course";
    }

    deleteUrlCourseList(id:number, courseId:number): string {
        return "http://mtpc583:8080/api/secure/period/"+id+"/course/delete/"+courseId;
    }

   postUrlAddCourse(id:number): string {
       return "http://mtpc583:8080/api/secure/period/"+id+"/course/add";
   }

   getUrlListTrainer(): string {
    return "http://mtpc583:8080/api/secure/user/trainer";
   }

   getUrlListForAddCourse(): string {
       return "http://mtpc583:8080/api/secure/period/course";
   }

   getUrlClassRoom(): string {
        return "http://mtpc583:8080/api/secure/period/classroom";
    }

   getUrlDetailCourse(idTraining: number, idCourse: number): string {
       return "http://mtpc583:8080/api/secure/period/"+idTraining+"/course/"+idCourse;
   } 

   postEditCourse(idTraining:number, idCourse:number): string {
    return "http://mtpc583:8080/api/secure/period/"+idTraining+"/course/"+idCourse+"/edit"; //dummy
    }

   getUrlListUserForEnrollParticipants(idTraining:number, idCourse:number): string {
        return "http://mtpc583:8080/api/secure/period/"+idTraining+"/course/"+idCourse+"/eligible/"; 
    }

    postEnrollParticipant(idTraining:number, idCourse:number): string {
        return "http://mtpc583:8080/api/secure/period/"+idTraining+"/course/"+idCourse+"/eligible/add"; 
    }

    getUrlEnrollment(): string {
        return "http://mtpc583:8080/api/secure/enrollment";
    }

    getUrlAchievementList(): string {
        return "http://mtpc583:8080/api/secure/achievement";
    }

    getUrlMaintenancetList(id: number): string {
        return "http://mtpc583:8080/api/secure/maintenance/"+id; //bener belum ya?
    }

   getUrlActiveTraining(): string {
       return null;
   }

   getUrlBCCShedule(): string {
       return null;
   }


}