/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */
import { createStyles, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';

import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from 'utils/authUtil';
import { DefaultSerializer } from 'v8';

type AppActionType =
  | {
      type: 'SET_ROW_DATA';
      payload: {
        data: any[];
        isSelectedAll: boolean;
        isClearAllFilter?: boolean;
      };
    }
  | { type: 'OPEN_MODAL_TABLE' }
  | { type: 'OPEN_MODAL_WASHING' }
  | { type: 'OPEN_MODAL' }
  | { type: 'OPEN_MODAL_SIZE' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_SAMPLE_STYLE_ID'; payload: any }
  | { type: 'PIN_ROW'; payload: string[] }
  | {
      type: 'SELECT_ROW';
      payload: {
        rowSelect: string[];
        listData: any[];
        listNameOperation: any[];
        selectedAll?: boolean;
      };
    }
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
  | { type: 'CLEAR_ALL' }
  | { type: 'SET_ADDING' }
  | { type: 'SET_EDITING'; payload: any }
  | { type: 'CLEAR_ADD_EDIT' }
  | { type: 'SET_OPTIONS_DATA'; payload: any }
  | { type: 'CLEAR_LIST_NAME' }
  | { type: 'CLEAR_LIST_WFX_USER' }
  | { type: 'CLEAR_LIST_USER_DETAIL' }
  | { type: 'CLEAR_LIST_USER_DETAIL_VIEW' }
  | { type: 'CLEAR_LIST_SEARCH_USER_DETAIL_VIEW' }
  | { type: 'CLEAR_LIST_WFX_USER' }
  | { type: 'SET_LIST_WFX_USER'; payload: any }
  | { type: 'SET_LIST_USER_DETAIL'; payload: any }
  | { type: 'SET_LIST_USER_DETAIL_VIEW'; payload: any }
  | { type: 'SELECT_TP'; payload: any }
  | { type: 'RESTART_STATE'; payload: any }
  | { type: 'SET_SELECT_OPERATION_LIST'; payload: any }
  | { type: 'SET_LIST_NAME'; payload: any }
  | { type: 'SET_BOOK_DETAIL'; payload: any }
  | { type: 'SET_LIST_BOOK'; payload: any }
  | { type: 'SET_LIST_SIZE_BOOK_SR'; payload: any }
  | { type: 'SET_LIST_OPERATION_BOOK_SR'; payload: any }
  | { type: 'SET_LIST_SELECT_OPERATIONS'; payload: any }
  | { type: 'SET_LIST_SELECT_OPERATIONS_PARENT'; payload: any }
  | { type: 'SET_SELECT_PERMISSION'; payload: any }
  | { type: 'SET_LIST_PAGE_NAME'; payload: any }
  | { type: 'CLEAR_LIST_SELECT_3D' }
  | { type: 'IS_CHANGING_SETTING' };

const originalState = {
  doubleClickToDetail: true,
  rowData: [],
  modalTable: false,
  modalSize: false,
  modalWashing: false,
  modal: false,
  SampleID: {},
  listPinColumn: [] as string[],
  isSelectAll: false,
  checkList: [] as string[],
  listDataTable: [],
  selectAllValue: false,
  isClearAllFilter: false,
  listActiveMenu: [],
  gridApi: undefined,
  name: 'UNKNOWN_TABLE',
  textHighLight: '',
  hiddenSelect: false,
  rowSelected: null,
  listShowDate: ['materialDate', 'o_DD_1'],
  idEdit: null,
  isAdding: false,
  isEditing: false,
  optionsMapping: new Map<string, any[]>(),
  listNameOperation: [],
  checkListWfxUser: [],
  checkListUserDetail: [],
  checkListUserDetailView: [],
  checkListSearchUserDetailView: [],
  checkOperationList: [],
  isChanging: false,
  hiddenPinColumn: true,
  bookDetail: [],
  listBookData: [],
  listSizeBookSR: {
    BookCondition: {},
    sizetable: [],
  },
  listOperationBookSR: [],
  listSelectOperations: [],
  checkListTP: [],
  listPageName: [],
  selectPermission: [],
};

const reducer = (state = originalState as AppState, action: AppActionType) => {
  switch (action.type) {
    case 'IS_CHANGING_SETTING':
      return {
        ...state,
        isChanging: true,
      };
    case 'RESTART_STATE':
      return {
        ...state,
        ...action.payload,
        optionsMapping: state.optionsMapping,
      };
    case 'SET_ADDING':
      return {
        ...state,
        isAdding: true,
        isEditing: false,
      };
    case 'SET_EDITING':
      return {
        ...state,
        isAdding: false,
        isEditing: true,
        idEdit: action.payload,
      };
    case 'CLEAR_ADD_EDIT':
      return {
        ...state,
        isAdding: false,
        isEditing: false,
        idEdit: null,
      };
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
          (item) => item !== action.payload,
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
    case 'OPEN_MODAL_TABLE':
      return {
        ...state,
        modalTable: true,
      };
    case 'OPEN_MODAL_WASHING':
      return {
        ...state,
        modalWashing: true,
      };
    case 'OPEN_MODAL_SIZE':
      return {
        ...state,
        modalSize: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: false,
        modalTable: false,
        modalWashing: false,
        modalSize: false,
      };
    case 'SET_SAMPLE_STYLE_ID':
      return {
        ...state,
        SampleID: action.payload,
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
          (item) => !action.payload.some((i) => i === item),
        ),
        listDataTable: state.listDataTable.filter(
          (item) => !action.payload.some((i) => i === item.idReplace),
        ),
        selectAllValue: false,
      };
    case 'UN_SELECT_ROW':
      return {
        ...state,
        checkList: state.checkList.filter((item) => item !== action.payload),
        listDataTable: state.listDataTable.filter(
          (item) => item.idReplace !== action.payload,
        ),
        selectAllValue: false,
      };
    case 'SELECT_ROW':
      if (!state.isSelectAll) {
        return {
          ...state,
          checkList: action.payload.rowSelect,
          listDataTable: action.payload.listData,
          listNameOperation: action.payload.listNameOperation,
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
        listNameOperation: action.payload.listNameOperation,
        selectAllValue: action.payload?.selectedAll,
      };
    case 'SET_LIST_WFX_USER':
      if (!state.isSelectAll) {
        return {
          ...state,
          checkListWfxUser: action.payload.rowSelect,
        };
      }
      return {
        ...state,
        checkListWfxUser: [
          ...state.checkListWfxUser,
          ...action.payload.rowSelect,
        ].filter(
          (item, index, self) => index === self.findIndex((j) => j === item),
        ),
      };
    case 'SET_LIST_USER_DETAIL':
      if (!state.isSelectAll) {
        return {
          ...state,
          checkListUserDetail: action.payload.rowSelect,
        };
      }
      return {
        ...state,
        checkListUserDetail: [
          ...state.checkListUserDetail,
          ...action.payload.rowSelect,
        ].filter(
          (item, index, self) => index === self.findIndex((j) => j === item),
        ),
      };
    case 'SET_LIST_USER_DETAIL_VIEW':
      if (!state.isSelectAll) {
        return {
          ...state,
          checkListUserDetailView: action.payload.rowSelect,
        };
      }
      return {
        ...state,
        checkListUserDetailView: [
          ...state.checkListUserDetailView,
          ...action.payload.rowSelect,
        ].filter(
          (item, index, self) => index === self.findIndex((j) => j === item),
        ),
      };
    case 'SELECT_TP':
      if (!state.isSelectAll) {
        return {
          ...state,
          checkListTP: action.payload.rowSelect,
        };
      }
      return {
        ...state,
        checkListTP: [...state.checkListTP, ...action.payload.rowSelect].filter(
          (item, index, self) => index === self.findIndex((j) => j === item),
        ),
      };
    case 'SET_SELECT_OPERATION_LIST':
      if (!state.isSelectAll) {
        return {
          ...state,
          checkOperationList: action.payload.rowSelect,
        };
      }
      return {
        ...state,
        checkOperationList: [
          ...state.checkOperationList,
          ...action.payload.rowSelect,
        ].filter(
          (item, index, self) => index === self.findIndex((j) => j === item),
        ),
      };
    case 'SET_LIST_NAME':
      return {
        ...state,
        checkList: action.payload.listId,
        listDataTable: action.payload.listOperation,
      };
    case 'CLEAR_LIST_NAME':
      return {
        ...state,
        listNameOperation: [],
        checkOperationList: [],
      };
    case 'CLEAR_LIST_WFX_USER':
      return {
        ...state,
        checkListWfxUser: [],
      };
    case 'CLEAR_LIST_USER_DETAIL':
      return {
        ...state,
        checkListUserDetail: [],
      };
    case 'CLEAR_LIST_USER_DETAIL_VIEW':
      return {
        ...state,
        checkListUserDetailView: [],
      };
    case 'CLEAR_LIST_SEARCH_USER_DETAIL_VIEW':
      return {
        ...state,
        checkListSearchUserDetailView: [],
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
    case 'SET_OPTIONS_DATA':
      return {
        ...state,
        optionsMapping: action.payload,
      };
    case 'SET_BOOK_DETAIL':
      return {
        ...state,
        bookDetail: action.payload,
      };
    case 'SET_LIST_BOOK':
      return {
        ...state,
        listBookData: action.payload,
      };
    case 'SET_LIST_SIZE_BOOK_SR':
      return {
        ...state,
        listSizeBookSR: action.payload,
      };
    case 'SET_LIST_OPERATION_BOOK_SR':
      return {
        ...state,
        listOperationBookSR: action.payload,
      };
    case 'SET_LIST_SELECT_OPERATIONS':
      return {
        ...state,
        listSelectOperations: action.payload,
      };
    case 'SET_LIST_SELECT_OPERATIONS_PARENT':
      return {
        ...state,
        checkListTP: action.payload,
      };
    case 'SET_SELECT_PERMISSION':
      return {
        ...state,
        selectPermission: action.payload ? [action.payload] : [],
      };
    case 'CLEAR_LIST_SELECT_3D':
      return {
        ...state,
        checkListTP: [],
      };
    case 'SET_LIST_PAGE_NAME':
      return {
        ...state,
        listPageName: action.payload,
      };
    default:
      return state;
  }
};
export interface AppState {
  rowData: any;
  columnDefs?: ColDef[];
  modalTable: boolean;
  modalSize: boolean;
  modalWashing: boolean;
  SampleID: any;
  modal: boolean;
  listPinColumn: string[];
  doubleClickToDetail: boolean;
  isSelectAll: boolean;
  checkList: string[];
  listDataTable: any[];
  selectAllValue: boolean;
  listActiveMenu: string[];
  isClearAllFilter: boolean;
  gridApi?: GridReadyEvent | undefined;
  name?: string;
  textHighLight?: string;
  hiddenSelect?: boolean;
  rowSelected?: any;
  listShowDate?: string[];
  isEditing?: boolean;
  isAdding?: boolean;
  idEdit?: any;
  optionsMapping?: Map<string, any[]>;
  listNameOperation?: any[];
  checkListWfxUser: string[];
  checkListUserDetail: string[];
  checkListUserDetailView: string[];
  checkListSearchUserDetailView: string[];
  checkOperationList: string[];
  isChanging: boolean;
  hiddenPinColumn?: boolean;
  bookDetail: any[];
  listBookData: any[];
  listSizeBookSR: any;
  listOperationBookSR: any[];
  conditions?: any;
  listSelectOperations: any[];
  checkListTP: string[];
  listPageName: any[];
  selectPermission: any[];
  selectValueUserDetailPermission?: any;
}

export const useGridHook = ({
  initState,
  isClearAllFilterGrid,
  callBack,
}: any) => {
  const [store, dispatch] = useReducer(reducer, {
    ...originalState,
    ...initState,
  });

  const { gridApi, name } = store;
  const [mapData, setMapData] = useState<Map<any, any>>(new Map());

  const restartStore = useCallback(() => {
    dispatch({
      type: 'RESTART_STATE',
      payload: {
        ...originalState,
        ...initState,
      },
    });
  }, []);
  const changleMapData = useCallback(
    (key: string, nameObj: any, value: any) => {
      const currentMap = new Map(mapData);
      if (currentMap.has(key)) {
        const obj = currentMap.get(key);
        obj[nameObj] = value;
        currentMap.set(key, obj);
        setMapData(currentMap);
      } else {
        const obj: any = {};
        obj[nameObj] = value;
        currentMap.set(key, obj);
        setMapData(currentMap);
      }
      if (!store.isChanging) {
        dispatch({ type: 'IS_CHANGING_SETTING' });
      }
    },
    [mapData, store.isChanging],
  );
  // const changeMapDataForFactory
  const replaceMapData = useCallback(
    (mapPing: any) => {
      const currentMap = new Map(mapPing);
      setMapData(currentMap);
    },
    [mapData],
  );
  const setRowData = (
    tempData: any[],
    isSelectedAll = false,
    isClearAllFilter = false,
  ) => {
    console.log('tempData', tempData);
    dispatch({
      type: 'SET_ROW_DATA',
      payload: { data: tempData, isSelectedAll, isClearAllFilter },
    });
  };
  const setOptionsData = useCallback((payload: any) => {
    dispatch({ type: 'SET_OPTIONS_DATA', payload });
  }, []);
  const setAddingAction = useCallback(() => {
    dispatch({ type: 'SET_ADDING' });
  }, []);
  const openModal = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL' });
  }, []);
  const openModalTable = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_TABLE' });
  }, []);
  const openModalWashing = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_WASHING' });
  }, []);
  const openModalSize = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_SIZE' });
  }, []);
  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);
  const setSampleID = useCallback((payload: any) => {
    dispatch({ type: 'SET_SAMPLE_STYLE_ID', payload });
  }, []);
  const setListNameOperation = useCallback(
    (listOperation: any[], listId: any[]) => {
      dispatch({ type: 'SET_LIST_NAME', payload: { listOperation, listId } });
    },
    [],
  );
  const clearListNameOperation = useCallback(() => {
    dispatch({ type: 'CLEAR_LIST_NAME' });
  }, []);
  const clearListWfxUser = useCallback(() => {
    dispatch({ type: 'CLEAR_LIST_WFX_USER' });
  }, []);
  const clearListUserDetail = useCallback(() => {
    dispatch({ type: 'CLEAR_LIST_USER_DETAIL' });
  }, []);
  const clearListUserDetailView = useCallback(() => {
    dispatch({ type: 'CLEAR_LIST_USER_DETAIL_VIEW' });
  }, []);
  const clearListSearchUserDetailView = useCallback(() => {
    dispatch({ type: 'CLEAR_LIST_SEARCH_USER_DETAIL_VIEW' });
  }, []);
  const clearListSelect3D = useCallback(() => {
    dispatch({ type: 'CLEAR_LIST_SELECT_3D' });
  }, []);
  const setEditingAction = useCallback((payload) => {
    dispatch({ type: 'SET_EDITING', payload });
  }, []);
  const setBookDetail = useCallback((payload) => {
    dispatch({ type: 'SET_BOOK_DETAIL', payload });
  }, []);
  const setListBookData = useCallback((payload) => {
    dispatch({ type: 'SET_LIST_BOOK', payload });
  }, []);
  const setListSizeBookSR = useCallback((payload) => {
    dispatch({ type: 'SET_LIST_SIZE_BOOK_SR', payload });
  }, []);
  const setListOperationBookSR = useCallback((payload) => {
    dispatch({ type: 'SET_LIST_OPERATION_BOOK_SR', payload });
  }, []);
  const setListSelectOperationParent = useCallback((payload) => {
    dispatch({ type: 'SET_LIST_SELECT_OPERATIONS_PARENT', payload });
  }, []);
  const selectValueUserDetailPermission = useCallback((payload) => {
    dispatch({ type: 'SET_SELECT_PERMISSION', payload });
  }, []);
  const clearEditAddAction = useCallback(() => {
    dispatch({ type: 'CLEAR_ADD_EDIT' });
  }, []);
  const selectAllFunc = useCallback(
    (value: boolean, replaceRowData = store.rowData) => {
      // const instances = gridApi?.api?.getCellRendererInstances();
      const listIdTemp = [] as any[];
      // if (instances) {
      // }
      // instances.forEach((instance: any) => {
      //   const { params: { data } } = instance;
      //   listIdTemp.push(data.idReplace);
      // });
      replaceRowData.forEach((data: any) => {
        listIdTemp.push(data.idReplace);
      });
      if (value) {
        const newState = [...store.checkList, ...listIdTemp];
        const temp = replaceRowData.filter((item: any) => newState.some((j) => item.idReplace === j));
        dispatch({
          type: 'SELECT_ALL',
          payload: {
            rowSelect: newState,
            listData: temp,
            value,
          },
        });
        // setValue('exportOrder', temp.length);
      } else {
        dispatch({
          type: 'UN_SELECT_ALL',
          payload: listIdTemp,
        });
        // setValue('exportOrder', '');
      }
    },
    [store.rowData, gridApi, store.checkList],
  );

  const selectValueWfxUser = useCallback(
    (idTemp: string) => {
      if (store.checkListWfxUser.includes(idTemp)) {
        const newState = store.checkListWfxUser.filter(
          (item: any) => item !== idTemp,
        );
        dispatch({
          type: 'SET_LIST_WFX_USER',
          payload: { rowSelect: newState },
        });
      } else {
        const newState = [...(store.checkListWfxUser || []), idTemp];
        dispatch({
          type: 'SET_LIST_WFX_USER',
          payload: { rowSelect: newState },
        });
      }
    },
    [store.checkListWfxUser],
  );

  const selectValueUserDetail = useCallback(
    (idTemp: string) => {
      if (store.checkListUserDetail.includes(idTemp)) {
        const newState = store.checkListUserDetail.filter(
          (item: any) => item !== idTemp,
        );
        dispatch({
          type: 'SET_LIST_USER_DETAIL',
          payload: { rowSelect: newState },
        });
      } else {
        const newState = [...(store.checkListUserDetail || []), idTemp];
        dispatch({
          type: 'SET_LIST_USER_DETAIL',
          payload: { rowSelect: newState },
        });
      }
    },
    [store.checkListUserDetail],
  );

  const selectValueUserDetailView = useCallback(
    (data: any) => {
      const arrayID = store.checkListUserDetailView.map(
        (nameItem: { userID: string }) => nameItem.userID,
      );
      if (arrayID.includes(data.userID)) {
        const newState = store.checkListUserDetailView.filter(
          (item: any) => item.userID !== data.userID,
        );
        dispatch({
          type: 'SET_LIST_USER_DETAIL_VIEW',
          payload: { rowSelect: newState },
        });
      } else {
        const newState = [...(store.checkListUserDetailView || []), data];
        dispatch({
          type: 'SET_LIST_USER_DETAIL_VIEW',
          payload: { rowSelect: newState },
        });
      }
    },
    [store.checkListUserDetailView],
  );

  const selectValue = useCallback(
    (idTemp: string, replaceRowData = store.rowData, mainOperation = []) => {
      if (store.checkList.includes(idTemp)) {
        const newState = store.checkList.filter((item: any) => item !== idTemp);
        const operationSeqsTemp = replaceRowData.filter((item: any) => newState.includes(item.id));
        const listNameOperation = operationSeqsTemp.map(
          (item: any) => item.operationName,
        );
        dispatch({
          type: 'SELECT_ROW',
          payload: {
            rowSelect: newState,
            listData: operationSeqsTemp,
            listNameOperation,
          },
        });
      } else {
        const newState = [...(store.checkList || []), idTemp];
        const operationSeqsTemp = replaceRowData.filter((item: any) => newState.includes(item.id));
        const listNameOperation = operationSeqsTemp.map(
          (item: any) => item.operationName,
        );
        const isSelectedAll = newState.length === store.rowData.length;
        dispatch({
          type: 'SELECT_ROW',
          payload: {
            rowSelect: newState,
            listData: operationSeqsTemp,
            listNameOperation,
            selectedAll: isSelectedAll,
          },
        });
      }
    },
    [store.rowData, store.checkList],
  );

  const selectValueTPCheckList = useCallback(
    (idTemp: string, replaceRowData = store.rowData, mainOperation = []) => {
      if (store.checkListTP.includes(idTemp)) {
        const newState = store.checkListTP.filter(
          (item: any) => item !== idTemp,
        );
        dispatch({ type: 'SELECT_TP', payload: { rowSelect: newState } });
      } else {
        const newState = [...(store.checkListTP || []), idTemp];
        dispatch({
          type: 'SELECT_TP',
          payload: {
            rowSelect: newState,
          },
        });
      }
    },
    [store.rowData, store.checkListTP],
  );

  const selectOperationList = useCallback(
    (idTemp: string, replaceRowData = store.rowData) => {
      if (store.checkOperationList.includes(idTemp)) {
        const newState = store.checkOperationList.filter(
          (item: any) => item !== idTemp,
        );
        const temp = replaceRowData.filter((item: any) => newState.some((j: any) => item.idReplace === j));
        dispatch({
          type: 'SET_SELECT_OPERATION_LIST',
          payload: { rowSelect: newState, listData: temp },
        });
      } else {
        const newState = [...store.checkOperationList, idTemp];
        const temp = replaceRowData.filter((item: any) => newState.some((j) => item.idReplace === j));
        dispatch({
          type: 'SET_SELECT_OPERATION_LIST',
          payload: { rowSelect: newState, listData: temp },
        });
      }
    },
    [store.rowData, store.checkOperationList],
  );

  const unSelectValue = useCallback((idTemp: string) => {
    dispatch({ type: 'UN_SELECT_ROW', payload: idTemp });
  }, []);

  const selectValueRedux = useCallback((data: any) => {
    dispatch({ type: 'SELECT_ROW_REDUX', payload: data });
  }, []);

  const pinColumn = (id: string) => {
    if (gridApi) {
      if (store.listPinColumn.includes(id)) {
        const newState = store.listPinColumn.filter((item: any) => item !== id);
        gridApi.columnApi.applyColumnState({
          state: newState.map((item: any) => ({ colId: item, pinned: 'left' })),
          defaultState: { pinned: null },
        });
        dispatch({ type: 'PIN_ROW', payload: newState });
      } else {
        const newState = [...store.listPinColumn, id];
        gridApi.columnApi.applyColumnState({
          state: newState.map((item) => ({ colId: item, pinned: 'left' })),
          defaultState: { pinned: null },
        });
        dispatch({ type: 'PIN_ROW', payload: newState });
      }
    }
  };

  const setActiveMenu = useCallback((idTemp: string) => {
    dispatch({ type: 'SET_ACTIVE_MENU', payload: idTemp });
    // callBack && callBack(true);
  }, []);

  const setNotActiveMenu = useCallback((idTemp: string) => {
    dispatch({ type: 'SET_NOT_ACTIVE_MENU', payload: idTemp });
    // callBack && callBack(false);
  }, []);

  const setGridApi = useCallback((params: GridReadyEvent) => {
    dispatch({ type: 'SET_GRID_API', payload: params });
  }, []);

  const saveState = useCallback(() => {
    if (gridApi) {
      // (window as any).colState = gridApi.columnApi.getColumnState();
      const temp = gridApi.columnApi.getColumnState();
      const target: string[] = [];
      temp.forEach((element: any) => {
        if (element.pinned && element.colId) {
          target.push(element.colId);
        }
      });
      dispatch({ type: 'PIN_ROW', payload: target });
      setLocalStorage(name || 'UNKNOWN_TABLE', JSON.stringify(temp));
    }
  }, [gridApi]);

  const restoreState = useCallback(
    (gridApiTemp: GridReadyEvent | undefined = gridApi) => {
      try {
        const stateColumn: ColumnState[] = JSON.parse(
          getLocalStorage(name || 'UNKNOWN_TABLE'),
        );
        if (!stateColumn) {
          return;
        }
        const target: string[] = [];
        stateColumn.forEach((element) => {
          if (element.pinned && element.colId) {
            target.push(element.colId);
          }
        });
        dispatch({ type: 'PIN_ROW', payload: target });
        if (gridApiTemp) {
          gridApiTemp.columnApi.applyColumnState({
            state: stateColumn,
            applyOrder: true,
          });
        }
      } catch (error: any) {
        removeLocalStorage(name || 'UNKNOWN_TABLE');
      }
    },
    [gridApi],
  );

  const resetState = useCallback(() => {
    if (gridApi) {
      gridApi.columnApi.resetColumnState();
      removeLocalStorage(name || 'UNKNOWN_TABLE');
      dispatch({ type: 'PIN_ROW', payload: [] });
    }
  }, [gridApi]);

  const setTextHighLight = useCallback((text: string) => {
    dispatch({ type: 'SET_TEXT_HIGHLIGHT', payload: text });
  }, []);

  const handleSetSelectRow = useCallback((row: any) => {
    dispatch({ type: 'SET_SELECT_ROW', payload: row });
  }, []);
  const setListSelectOperations = useCallback((data: any) => {
    dispatch({ type: 'SET_LIST_SELECT_OPERATIONS', payload: data });
  }, []);
  const setListPageName = useCallback((data: any) => {
    dispatch({ type: 'SET_LIST_PAGE_NAME', payload: data });
  }, []);

  const handleListShowDate = useCallback(() => ['materialDate', 'o_DD_1'], []);

  useEffect(() => {
    if (isClearAllFilterGrid) {
      dispatch({ type: 'CLEAR_ALL' });
    }
  }, [isClearAllFilterGrid]);
  return {
    store,
    setRowData,
    pinColumn,
    setActiveMenu,
    setNotActiveMenu,
    saveState,
    setGridApi,
    restoreState,
    resetState,
    selectAllFunc,
    selectValue,
    unSelectValue,
    setTextHighLight,
    selectValueRedux,
    handleSetSelectRow,
    handleListShowDate,
    setAddingAction,
    setEditingAction,
    clearEditAddAction,
    openModal,
    closeModal,
    setOptionsData,
    clearListNameOperation,
    setListNameOperation,
    openModalTable,
    setSampleID,
    selectValueWfxUser,
    selectValueUserDetail,
    selectValueUserDetailView,
    clearListWfxUser,
    clearListUserDetail,
    clearListUserDetailView,
    changleMapData,
    mapData,
    replaceMapData,
    restartStore,
    selectOperationList,
    setMapData,
    openModalWashing,
    dispatch,
    openModalSize,
    setBookDetail,
    setListBookData,
    setListSizeBookSR,
    setListOperationBookSR,
    clearListSearchUserDetailView,
    setListSelectOperations,
    clearListSelect3D,
    selectValueTPCheckList,
    setListSelectOperationParent,
    setListPageName,
    selectValueUserDetailPermission,
  };
};
