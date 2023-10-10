export interface IOperationInput{
    id:string,
    bookId:string,
    operationDuration:number,
    factoryName:string,
    siteName:string,
    beginPlan:string,
    endPlan:string,
    beginActual: string | null,
    endActual: string |null,
    isOutTnA: boolean,
    reasonOutTnA: null | string,
    isDelayBeginActual: boolean,
    reasonDelayBegin: null | string,
    seq: number,
    action: any[],
    operation:any,
}
