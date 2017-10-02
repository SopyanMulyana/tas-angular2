export class AddUsers {
    constructor(
        public accountName: string,
        public password: string,
        public fullName: string,
        public gradeId: number,
        public stream: string,
        public email: string,
        public locationId: number
        ){}
    }