export interface IClass{
    id: string;
    description: string;
    createDate: string;
    updateDate: string;
    name: string;
    updateUserId: number;
    createUserId: number;
    isInactive: boolean;
    isSystemLib: boolean;
}

export interface IClassDetail {
    classId: string;
    id: string;
    description: string;
    createDate: string;
    updateDate: string;
    name: string;
    isInactive: boolean;
    isDeleted: boolean;
}

export interface IParamsPostClass{
    // id:string,
    description:string,
    // createDate:string,
    // updateDate:string,
    name:string,
    isInactive: boolean,
    isSystemLib:boolean,
}

export interface IParamsPostClassDetail{
    classId: string;
    id: string;
    description: string;
    createDate: string;
    updateDate: string;
    name: string;
}
