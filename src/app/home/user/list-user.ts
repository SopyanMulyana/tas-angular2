export class ListUser {
    constructor(
        public employeeId: number,
        public fullName: string,
        public email: string,
        public jobFamily: string,
        public grade: string,
        public accountName: string,
        public active: string,
        public role: string
        ){}
    }