import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UrlService {
   constructor() {
   }
 
   getUrlUsers(): string {
      return "http://localhost:8080/api/all/";
   }

   getUrlEmployee(): string {
        return null;
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

    

   getUrlActiveTraining(): string {
       return null;
   }

   getUrlBCCShedule(): string {
       return null;
   }

   getUrlEnrollment(): string {
       return null;
   }

   getUrlAchievement(): string {
       return null;
   }
}