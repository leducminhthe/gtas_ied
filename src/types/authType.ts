/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
export type AuthState = {
  isAuth: boolean,
  error: string[],
  isLoading: boolean,
  staffDetail: any,
  roles: RolesType,
  isAdmin?: boolean,
  defaultFactory: any,
}

export enum SeverEnum {
  Test = '1',
  Live = '2'
}
/**
 * wfxSampleOrderAccess
sampleRequestAccess
transactionAccess
reportAccess
userPermissionAccess
mapUserGroupAccess
mapUserSiteAccess
bookSRAccess
sampleRequestDetailAccess
 */
export type RoleAccessType =
  | 'wfxSampleOrderAccess'
  | 'sampleRequestAccess'
  | 'transactionAccess'
  | 'reportAccess'
  | 'userPermissionAccess'
  | 'mapUserGroupAccess'
  | 'mapUserSiteAccess'
  | 'bookSRAccess'
  | 'sampleRequestDetailAccess'
  | 'permissionGroupAccess'
  | 'operationDetailAccess'
  | 'warehouseRptAccess'
  | 'stockRptAccess'
  | 'inventoryRptAccess';

export type RolesType = {
  [key in RoleAccessType]?: IRoleResponses
};
export type PrivateRouteType = {
  path: string,
  loadComponent: React.ComponentType,
  title: string,
  exact?: boolean,
  isPrivate?: boolean,
  hasAppbar?: boolean,
  subRoutes?: PrivateRouteType[]
  hasNotSidebar?: boolean
}

export interface IUser {
  name: string;
  username: string;
}

export interface IAuthState {
  token: string;
  user: IUser;
}

export interface ISignInCredentials {
  username: string;
  password: string;
}

// eslint-disable-next-line camelcase
export type JwtPayloadType = { nameid: string, unique_name: string, email: number, is_admin: string, exp: number, iat: number }

export interface ISignIn {
  message: string,
  token: string,
  refreshToken: string
  groups: IGroup[],
  permission: IPermission[],
  data: string
  email: string
  fullName: string
  id: string
  isAdmin: boolean
  userId: number
}

export interface IPermission {
  featureCode: FeatureCodeType
  actions: {
    Approve: boolean
    Confirm: boolean
    Create: boolean
    Delete: boolean
    Export: boolean
    Import: boolean
    Lock: boolean
    Read: boolean
    Transfer: boolean
    Unlock: boolean
    Update: boolean
    Reject: boolean
  }
}

export interface IPage {
  code: string
  name: string
  description: string
  id: string
  updateDate: string
  createDate: string
}

export interface IAction {
  code: string
  name: string
  description: string
  id: string
  updateDate: string
  createDate: string
}

export interface IGroup {
  name: string
  pageActions: IPageActions[],
  id: string
  updateDate: string
  createDate: string
}
export interface IRoleResponses {
  featureCode: FeatureCodeType;
  possibleToCreate: boolean,
  possibleToRead: boolean,
  possibleToExport: boolean,
  possibleToApprove: boolean,
  possibleToImport: boolean,
  possibleDelete: boolean,
  possibleToTransfer: boolean,
  possibleToLock: boolean,
  possibleToUpdate: boolean,
  possibleToConfirm: boolean,
  possibleToUnLock: boolean,
  possibleToReject: boolean
  // possibleToAll:boolean,
}

export enum IActionType {
  Create = 'C',
  Read = 'R',
  Update = 'U',
  Delete = 'D',
  Confirm = 'O',
  Approve = 'A',
  Transfer = 'T',
  Lock = 'L',
  Unlock = 'U',
  Import = 'I',
  Export = 'E',
  All = 'A'
}

export type FeatureCodeType =
  'C001'
  | 'C002'
  | 'C003'
  | 'C004'
  | 'C005'
  | 'C006'
  | 'C007'
  | 'C008'
  | 'C009'
  | 'C0010'
  | 'C0011'
  | 'warehouse_rpt'
  | 'stock_rpt'
  | 'inventory_rpt';
export enum IFeatureCode {
  WFX_SAMPLE_ORDER = 'WFX_SAMPLE_ORDER',
  SAMPLE_REQUEST = 'SAMPLE_REQUEST',
  TRANSACTION = 'TRANSACTION',
  REPORT = 'REPORT',
  USER_PERMISSION = 'USER_PERMISSION',
  MAP_USER_GROUP = 'MAP_USER_GROUP',
  MAP_USER_SITE = 'MAP_USER_SITE',
  BOOK_SR = 'BOOK_SR',
  SAMPLE_REQUEST_DETAIL = 'SAMPLE_REQUEST_DETAIL',
  PERMISSION_GROUP = 'PERMISSION_GROUP',
  OPERATION_DETAIL = 'OPERATION_DETAIL',
  warehouse_rpt = 'warehouse_rpt',
  stock_rpt = 'stock_rpt',
  inventory_rpt = 'inventory_rpt'
}

export const featureCodeRecord: Record<IFeatureCode, FeatureCodeType> = {
  [IFeatureCode.WFX_SAMPLE_ORDER]: 'C001',
  [IFeatureCode.SAMPLE_REQUEST]: 'C002',
  [IFeatureCode.BOOK_SR]: 'C003',
  [IFeatureCode.SAMPLE_REQUEST_DETAIL]: 'C004',
  [IFeatureCode.TRANSACTION]: 'C005',
  [IFeatureCode.USER_PERMISSION]: 'C006',
  [IFeatureCode.MAP_USER_GROUP]: 'C007',
  [IFeatureCode.MAP_USER_SITE]: 'C008',
  [IFeatureCode.REPORT]: 'C009',
  [IFeatureCode.PERMISSION_GROUP]: 'C0010',
  [IFeatureCode.OPERATION_DETAIL]: 'C0011',
  [IFeatureCode.warehouse_rpt]: 'warehouse_rpt',
  [IFeatureCode.stock_rpt]: 'stock_rpt',
  [IFeatureCode.inventory_rpt]: 'inventory_rpt',
};
export interface IResponsePermission {
  pageActions: IPageActions[]
}

export interface IPageActions {
  page: {
    id: string
    code: string
    name: string
  }
  actions: IActions[]
}
export interface IActions {
  id: string
  code: string,
  name: string
}

export interface IUserResponse {
  username: string,
  groups: IGroup[],
  permission: IPermission[],
  data: string
  email: string
  fullName: string
  id: string
  isAdmin: boolean
  userId: number,
  defaultFactory: any
}
