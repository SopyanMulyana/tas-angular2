export class AddPeriods {
    constructor(
        public trainingName: string,
        public startDate: string,
        public endDate: string,
        public openEnrollment: boolean,
        public activeStatus: boolean,
        public periodical: boolean
        ){}
    }

    // export interface AddPeriods {
    //     trainingName: string;
    //         startDate: string;
    //         endDate: string;
    //         openEnrollment: boolean;
    //         bccTraining: boolean;
    //         createdBy: string;
    //         updatedBy: string;
    //         active: boolean;
    
    //     }