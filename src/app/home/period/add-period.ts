export class AddPeriods {
    constructor(
        public trainingName: string,
        public startDate: string,
        public endDate: string,
        public openEnrollment: boolean,
        public bccTraining: boolean,
        public createdBy: string,
        public updatedBy: string,
        public active: boolean,
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