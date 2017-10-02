export interface ListUser {
    employeeId: number,
    fullName: string,
    email: string,
    jobFamilyStream: string,
    grade: string,
    accountName: string,
    active: boolean,
    role: number[],
    location: string
}
