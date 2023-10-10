/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import momentUtils from '@date-io/moment';
import {
  IconButton,
} from '@material-ui/core';
import {
  Clear,
} from '@material-ui/icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  Autocomplete, TextField,
} from '@mui/material';
import moment from 'moment';
import { AppContext } from 'context/GridContext';
import { useLayoutState } from 'context/LayoutContext';
import useStyleDarkmode from 'pages/qcInfo/styleDarkmode';
import React, {
  forwardRef, useContext, useEffect,
  useImperativeHandle, useRef, useState, useMemo,
} from 'react';
import { useSelector } from 'react-redux';

const alphaNumericSort = (arr = []) => {
  const sorter = (a, b) => {
    const isNumber = (v) => (+v).toString() === v;
    const aPart = a.match(/\d+|\D+/g) || '';
    const bPart = b.match(/\d+|\D+/g) || '';
    let i = 0; const len = Math.min(aPart.length, bPart.length);
    while (i < len && aPart[i] === bPart[i]) { i += 1; }
    if (i === len) {
      return aPart.length - bPart.length;
    }
    if (isNumber(aPart[i]) && isNumber(bPart[i])) {
      return aPart[i] - bPart[i];
    }
    return aPart[i].localeCompare(bPart[i]);
  };
  return arr.sort(sorter);
};
export default forwardRef((props, ref) => {
  const {
    setActiveMenu, setNotActiveMenu, isClearAllFilter, listActiveMenu, gridApi,
  } = useContext(AppContext);
  const {
    filterSelected,
  } = useSelector((state) => state.stripActiveFactoryInfo);
  const layoutState = useLayoutState();
  const classesDarkmode = useStyleDarkmode({ toggle: layoutState.isDarkMode });
  const [filterText, setFilterText] = useState(null);
  const [refreshData, setRefreshData] = useState([]);
  const timeOutRef = useRef(null);
  const { colDef } = props;
  const searchList = () => (props.agGridReact.gridOptions.rowData ? props.agGridReact.gridOptions.rowData.reduce((acc, item) => {
    if (!acc.includes(String(item[colDef.field]))) {
      acc.push(String(item[colDef.field]));
    }
    return acc;
  }, []) : []);

  const searchListShort = () => {
    const checkNumberArray = searchList().every((item) => !isNaN(Number(item)) === true);
    if (checkNumberArray) {
      return searchList().sort((a, b) => Number(a) - Number(b));
    }
    return alphaNumericSort(searchList());
  };
  const idList = [];
  // list xac dinh khi nafo thi render Date
  // expose AG Grid Filter Lifecycle callbacks
  const listShowDate = ['materialDate', 'o_DD_1', 'smv_Create_date', 'sam_Create_date', 'create_date'];
  useImperativeHandle(ref, () => ({

    doesFilterPass(params) {
      // make sure each word passes separately, ie search for firstname, lastname
      let passed = true;
      filterText
        .toLowerCase()
        .split(' ')
        .forEach((filterWord) => {
          const value = props.valueGetter(params);
          if (value?.toString().toLowerCase().indexOf(filterWord) < 0) {
            passed = false;
          } else {
            idList.push(params.data.fR_STRIP_ACTIVE_ID);
          }
        });
      return passed;
    },

    isFilterActive() {
      return filterText != null && filterText !== '';
    },

    getModel() {
      return { value: filterText };
    },

    setModel(model) {
      setFilterText(model?.value ?? '');
    },
  }));

  useEffect(() => {
    if (filterText) {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        setActiveMenu && setActiveMenu(colDef.field);
      }, 200);
    } else {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        setNotActiveMenu && setNotActiveMenu(colDef.field);
      }, 300);
    }
    props.filterChangedCallback();
  }, [filterText]);

  useEffect(() => {
    if (isClearAllFilter && listActiveMenu.includes(colDef.field)) {
      setFilterText('');
    }
  }, [isClearAllFilter]);

  const handleRefreshData = () => {
    setRefreshData(searchListShort());
  };

  if (listShowDate.includes(colDef.field)) {
    return (
      <div
        style={{
          // padding: 8, width: 260, height: 254, overflowY: 'hidden', overflow: 'hidden',
          padding: '10px 8px',
        }}
        className={classesDarkmode.backgroundColor}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '7px' }}>
          {`Filter ${colDef.headerName} field`}
        </div>
        <IconButton placeholder="Clear" color="primary" onClick={() => setFilterText('')}>
          <Clear />
        </IconButton>
        <MuiPickersUtilsProvider utils={momentUtils}>
          <KeyboardDatePicker
            inputRef={ref}
            variant="static"
            inputVariant="filled"
            format="ll"
            disableToolbar={true}
            autoOk={false}
            value={filterText}
            onChange={(date, newValue) => {
              setFilterText(newValue);
            }}
            inputProps={{ style: { padding: '10px' } }}
            style={{
              width: '100%', border: 0,
            }}
            fullWidth={true}
            label={`Search ${colDef.headerName}`}
            InputLabelProps={{ style: { fontSize: 15 } }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

        </MuiPickersUtilsProvider>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 8, width: 260, height: 254, overflowY: 'hidden', overflow: 'hidden',
      }}
      className={classesDarkmode.backgroundColor}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '7px' }}>
        {`Filter ${colDef.headerName} field`}
      </div>
      <Autocomplete
        disablePortal={true}
        id="controllable-states-demo"
          // options={['test 1', 'test 2', 'test 3', 'test 4', 'test 5', 'test 6', 'test 7', 'test 8', 'test 9', 'test 10']}
        options={searchListShort()}
        onOpen={handleRefreshData}
        freeSolo={true}
        sx={{ width: 245, height: '100%' }}
        ListboxProps={{ style: { maxHeight: '181px', borderRadius: 'none', borderBottom: 'none !important' } }}
        onChange={(event, newValue) => {
          setFilterText(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setFilterText(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} size="small" label={`Search ${colDef.headerName}`} InputLabelProps={{ style: { fontSize: 15 } }} />}
      />
    </div>
  );
});
