/* eslint-disable import/no-cycle */
import { GridReadyEvent } from 'ag-grid-community';

type AppActionType =
  | {
      type: 'SET_ROW_DATA';
      payload: {
        data: any[];
        isSelectedAll: boolean;
        isClearAllFilter?: boolean;
      };
    }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'PIN_ROW'; payload: string[] }
  | { type: 'SELECT_ROW'; payload: { rowSelect: string[]; listData: any[] } }
  | {
      type: 'SELECT_ALL';
      payload: { rowSelect: string[]; listData: any[]; value: boolean };
    }
  | { type: 'UN_SELECT_ROW'; payload: string }
  | { type: 'UN_SELECT_ALL'; payload: string[] }
  | { type: 'SET_ACTIVE_MENU'; payload: string }
  | { type: 'SET_NOT_ACTIVE_MENU'; payload: string }
  | { type: 'SET_GRID_API'; payload: GridReadyEvent }
  | { type: 'SET_TEXT_HIGHLIGHT'; payload: string }
  | { type: 'SELECT_ROW_REDUX'; payload: any[] }
  | { type: 'SET_SELECT_ROW'; payload: any }
  | { type: 'SET_SHOW_DATE'; payload: any }
  | { type: 'NOT_CLEAR_ALL' }
  | { type: 'CLEAR_ALL' };

const reducer = (
  state = {
    doubleClickToDetail: true,
    rowData: [],
    modal: false,
    listPinColumn: [] as string[],
    isSelectAll: false,
    checkList: [] as string[],
    productListChecked: [],
    listDataTable: [],
    selectAllValue: false,
    isClearAllFilter: false,
    listActiveMenu: [],
    gridApi: undefined,
    textHighLight: '',
    hiddenSelect: false,
    rowSelected: null,
  } as any,
  action: AppActionType,
) => {
  switch (action.type) {
    case 'SET_GRID_API':
      return {
        ...state,
        gridApi: action.payload,
      };
    case 'SET_NOT_ACTIVE_MENU': {
      const { listActiveMenu } = state;
      return {
        ...state,
        listActiveMenu: listActiveMenu.filter(
          (item: string) => item !== action.payload,
        ),
        isClearAllFilter: false,
      };
    }
    case 'SET_ACTIVE_MENU': {
      const { listActiveMenu } = state;
      return {
        ...state,
        listActiveMenu: [...listActiveMenu, action.payload],
      };
    }
    case 'SET_ROW_DATA':
      if (action.payload.isSelectedAll) {
        return {
          ...state,
          rowData: action.payload.data,
          isSelectAll: action.payload.isSelectedAll,
          selectAllValue: false,
          isClearAllFilter: action.payload?.isClearAllFilter ?? false,
        };
      }

      return {
        ...state,
        rowData: action.payload.data,
        isSelectAll: action.payload.isSelectedAll,
        checkList: [],
        listDataTable: [],
        isClearAllFilter: action.payload?.isClearAllFilter ?? false,
      };

    case 'OPEN_MODAL':
      return {
        ...state,
        modal: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: false,
      };
    case 'PIN_ROW':
      return {
        ...state,
        listPinColumn: action.payload,
      };
    case 'SELECT_ROW_REDUX':
      return {
        ...state,
        checkList: action.payload,
      };
    case 'SELECT_ALL':
      return {
        ...state,
        selectAllValue: action.payload.value,
        checkList: [...state.checkList, ...action.payload.rowSelect].filter(
          (item, index, self) => index === self.findIndex((j) => j === item),
        ),
        listDataTable: [
          ...state.listDataTable,
          ...action.payload.listData,
        ].filter(
          (item, index, self) => index === self.findIndex((j) => j.idReplace === item.idReplace),
        ),
      };
    case 'UN_SELECT_ALL':
      return {
        ...state,
        checkList: state.checkList.filter(
          (item: string) => !action.payload.some((i) => i === item),
        ),
        listDataTable: state.listDataTable.filter(
          (item: { idReplace: string; }) => !action.payload.some((i) => i === item.idReplace),
        ),
        selectAllValue: false,
      };
    case 'UN_SELECT_ROW':
      return {
        ...state,
        checkList: state.checkList.filter((item: string) => item !== action.payload),
        listDataTable: state.listDataTable.filter(
          (item: { idReplace: string; }) => item.idReplace !== action.payload,
        ),
        selectAllValue: false,
      };
    case 'SELECT_ROW':
      if (!state.isSelectAll) {
        return {
          ...state,
          checkList: action.payload.rowSelect,
          listDataTable: action.payload.listData,
        };
      }
      return {
        ...state,
        checkList: [...state.checkList, ...action.payload.rowSelect].filter(
          (item, index, self) => index === self.findIndex((j) => j === item),
        ),
        listDataTable: [
          ...state.listDataTable,
          ...action.payload.listData,
        ].filter(
          (item, index, self) => index === self.findIndex((j) => j.idReplace === item.idReplace),
        ),
      };
    case 'SET_TEXT_HIGHLIGHT':
      return {
        ...state,
        textHighLight: action.payload,
      };
    case 'SET_SELECT_ROW':
      return {
        ...state,
        rowSelected: action.payload,
      };
    case 'NOT_CLEAR_ALL':
      return {
        ...state,
        isClearAllFilter: false,
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        isClearAllFilter: true,
      };
    default:
      return state;
  }
};
export default reducer;
