export class Periods {
    constructor(
        public trainingName: string,
        public activeStatus: boolean,
        public coursesCount: number,
        public startDate: string,
        public endDate: string,
        public createdBy: string,
        public editedBy: string
        ){}
    }