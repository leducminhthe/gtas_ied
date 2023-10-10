export interface TypeQty{
    g: number,
    hg: number,
    lp: number,
    mck: number,
}
export interface ISizeQuantities{
    size:string,
    total:TypeQty,
    updatedToDate:TypeQty,
    balanceSizeQty:TypeQty,
    maxUpdate:TypeQty,
}
export interface IResponseProductionOutput{
    id: string
    sampleRequestId: string
    bookId: string
    operationId: string
    fromSiteCode: string
    fromFactoryCode: number
    toSiteCode: string
    toFactoryCode: number
    sizeQuantities:ISizeQuantities[],
    colorName:string,
}
