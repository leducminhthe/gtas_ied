/* eslint-disable camelcase */
export interface IResponseProductSMV_SAM {
    p_code: string
    wfx_style_id: string
    p_OPN: string
    name: string
    typeOf: string
    p_WC: number
    p_SEQUENCE: number
    p_DESCRIPTOR: string
    import_Status_name: string
    rate: number
}

export interface IProductTableRow{
    color: string,
    fR_Product_ID_SAM: number,
    fR_Product_ID_SMV: number,
    index: 3,
    mark_as_temp_SAM: boolean,
    mark_as_temp_SMV: boolean,
    p_CODE: string,
    p_Process_Code_SAM: string,
    p_Process_Code_SMV: string,
    p_TYPE: string,
    saM_Import_Status: number,
    saM_Import_Status_Name: string,
    sam_Create_date: string,
    smV_Import_Status: number
    smV_Import_Status_Name: string,
    smv_Create_date: string,
    wfx_StyleID: string
}
export interface IResponseProductSMV_SAM_EDIT {
    color: string,
    export_status_name: string,
    fR_Product_Detail_ID: number,
    jSonOperation: Array<IProductTableSMV_SAM_Edit>,
    mark_as_temp: boolean,
    p_CODE: string,
    p_Process_Code: string,
    typeOf: string,
    udWSROUTE: string,
    version: string,
    washCost: number
}

export interface IProductTableSMV_SAM_Edit {
    FR_Operation_Group?: number,
    FR_Operation_Name_Group?: string,
    NAME?: string,
    P_DESCRIPTOR?: string,
    P_OPN?: string,
    P_SEQUENCE?: string,
    P_WC?: string,
    Rate?: number,
    import_status_name?: string,
    index?: number,
    typeOf?: string,
}

export interface IPostProductParams {
    fR_Product_ID: number,
    fR_Product_Detail_ID: number,
    p_CODE: string,
    wfx_style_id: string,
    color: string,
    p_Process_Code: string,
    typeOf: string,
    version: string,
    washCost: number,
    washCostFTY: number,
    rateFTY: number,
    udWSROUTE: string,
    jSonOperation: Array<IProductTableSMV_SAM_Edit> | [],
    mark_as_temp: boolean,
}

export interface IExportProductToText {
    fR_Product_ID_SAM: number,
    fR_Product_ID_SMV: number,
}
