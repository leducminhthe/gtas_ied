/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import {
  Autocomplete, Checkbox, TextField,
} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { AppContext } from 'context/GridContext';
import { useLayoutState } from 'context/LayoutContext';
import useStyleDarkmode from 'pages/qcInfo/styleDarkmode';
import React, {
  forwardRef, useContext, useEffect,
  useImperativeHandle, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilterSelectedList,
} from 'redux/factoryInfo/actions';
import useStyles from 'pages/libraryGroup/styles';

export default forwardRef((props, ref) => {
  const {
    setActiveMenu, setNotActiveMenu, isClearAllFilter, listActiveMenu,
  } = useContext(AppContext);
  const dispatch = useDispatch();
  const {
    filterSelected,
  } = useSelector((state) => state.stripActiveFactoryInfo);
  const layoutState = useLayoutState();
  const classesDarkmode = useStyleDarkmode({ toggle: layoutState.isDarkMode });
  const [filterText, setFilterText] = useState([]);
  const timeOutRef = useRef(null);
  const classes = useStyles();
  const { colDef, agGridReact: { props: { rowData } } } = props;
  const searchList = () => (rowData ? rowData.reduce((acc, item) => {
    if (!acc.includes(String(item[colDef.field]))) {
      acc.push(String(item[colDef.field]));
    }
    return acc;
  }, []) : []);
  const idList = [];
  // list xac dinh khi nafo thi render Date
  // expose AG Grid Filter Lifecycle callbacks
  useImperativeHandle(ref, () => ({
    doesFilterPass(params) {
      const arrayData = props.agGridReact.props.rowData;
      // make sure each word passes separately, ie search for firstname, lastname
      const result = arrayData.filter((item) => {
        const dataIncludes = filterText?.filter((innerItem) => (
          item.fR_Group_Line_Name?.includes(innerItem)
        ));
        if (dataIncludes?.length > 0) {
          return true;
        }
        return false;
      });
      let passed = true;
      if (result.length === 1) {
        passed = true;
      }
      if (result.length > 1) {
        passed = false;
      }
      const value = props.valueGetter(params);
      result.forEach((item) => {
        if (!item?.fR_Group_Line_Name.includes(value) && result.length === 1) {
          passed = false;
        } else if (item?.fR_Group_Line_Name.includes(value)) {
          idList.push(params.data.fR_STRIP_ACTIVE_ID);
          passed = true;
        }
      });
      return passed;
    },

    isFilterActive() {
      return filterText != null && filterText?.length !== 0;
    },
    getModel() {
      return { value: filterText };
    },

    setModel(model) {
      setFilterText(model?.value ?? []);
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
      setFilterText([]);
    }
  }, [isClearAllFilter]);

  useEffect(() => {
    if (idList.length > 0) {
      dispatch(setFilterSelectedList(idList));
    }
  }, [idList]);

  const [open, setOpen] = useState(false);
  const timer = useRef(-1);
  const handleClickAway = () => {
    setOpen(false);
    if (filterText.length === 0) {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        setNotActiveMenu && setNotActiveMenu(colDef.field);
      }, 300);
    }
  };
  const setOpenfilter = (isOpen) => {
    timer.current = window.setTimeout(() => {
      setOpen(isOpen);
    }, 200);
  };

  function getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part) => (part.toLowerCase() === highlight.toLowerCase() ? (
          <span style={{
            color: '#e17055',
          }}
          >
            {part}
          </span>
        ) : part))}
      </span>
    );
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div
        style={{
          padding: 8, width: 350, height: 300, overflowY: 'hidden', overflow: 'hidden',
        }}
        className={classesDarkmode.backgroundColor}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '7px' }}>
          {`Filter ${colDef.headerName} field`}
        </div>
        <Autocomplete
          disablePortal={true}
          id="controllable-states-demo"
          options={searchList()}
          limitTags={1}
          freeSolo={true}
          multiple={true}
          onOpen={(e) => {
            setOpenfilter(true);
          }}
          onClose={(obj, reason) => {
            setOpenfilter(false);
          }}
          open={open}
          className={filterText?.length > 0 ? classes.multipleCheckBox : classes.AutocompleteEmpty}
          ref={ref}
          disableCloseOnSelect={true}
          renderOption={(props, option, { inputValue, selected }) => (
            option === '' ? (
              ''
            ) : (
              <li {...props} key={option.label}>
                <Checkbox
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {getHighlightedText(option, inputValue)}
              </li>
            )
          )}
          // readOnly={true}
          isOptionEqualToValue={(option, value) => option === value}
          sx={{ width: 335, height: '100%' }}
          ListboxProps={{ style: { maxHeight: '200px', borderRadius: 'none', borderBottom: 'none !important' } }}
          onChange={(event, newValue) => {
            if (newValue.length === 0) {
              dispatch(setFilterSelectedList([]));
              setNotActiveMenu && setNotActiveMenu(colDef.field);
            }
            setFilterText(newValue);
          }}
          // onInputChange={(event, newInputValue) => {
          //   if (newInputValue === '') {
          //     dispatch(setFilterSelectedList([]));
          //   }
          //   setFilterText(newInputValue);
          // }}
          renderInput={(params) => <TextField {...params} size="small" label={`Search ${colDef.headerName}`} InputLabelProps={{ style: { fontSize: 15 } }} />}
        />
      </div>
    </ClickAwayListener>
  );
});
