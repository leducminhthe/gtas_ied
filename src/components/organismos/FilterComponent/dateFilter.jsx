/* eslint-disable react/button-has-type */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import momentUtils from '@date-io/moment';
import {
  IconButton, Box,
} from '@material-ui/core';
import {
  Clear,
} from '@material-ui/icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DatePicker from 'react-datepicker';

import { AppContext } from 'context/GridContext';
import { useLayoutState } from 'context/LayoutContext';
import moment from 'moment';
import useStyleDarkmode from 'pages/qcInfo/styleDarkmode';
import React, {
  forwardRef, useContext, useEffect,
  useImperativeHandle, useRef, useState,
} from 'react';
import range from 'lodash/range';
import 'react-datepicker/dist/react-datepicker.css';

export default forwardRef((props, ref) => {
  const {
    setActiveMenu, setNotActiveMenu,
  } = useContext(AppContext);
  const layoutState = useLayoutState();
  const classesDarkmode = useStyleDarkmode({ toggle: layoutState.isDarkMode });
  const [startDate, setStartDate] = useState(null);
  const timeOutRef = useRef(null);
  const { colDef, agGridReact: { props: { rowData } } } = props;

  useImperativeHandle(ref, () => ({

    doesFilterPass(params) {
      let passed = true;
      const value = moment(props.valueGetter(params)).format('ll');
      const convertedStartDate = moment(startDate).format('ll');
      if (convertedStartDate !== value) {
        passed = false;
      }
      return passed;
    },

    isFilterActive() {
      return startDate != null && startDate !== '';
    },

    getModel() {
      return { value: startDate };
    },

    setModel(model) {
      setStartDate(model?.value ?? '');
    },
  }));

  useEffect(() => {
    if (startDate) {
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
  }, [startDate]);

  const currentDate = new Date();
  const years = range(moment(currentDate).year(), 1990);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div
      style={{
        padding: '10px 8px',
        width: 261,
        height: 377,
      }}
      className={classesDarkmode.backgroundColor}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '7px' }}>
        {`Filter ${colDef.headerName} field`}
      </div>
      <Box display="flex" alignItems="center">
        <IconButton placeholder="Clear" color="primary" onClick={() => setStartDate(null)}>
          <Clear />
        </IconButton>
        <MuiPickersUtilsProvider utils={momentUtils}>
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {'<'}
                </button>
                <select
                  value={years[date.getYear()]}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[date.getMonth()]}
                  onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {'>'}
                </button>
              </div>
            )}
            selected={startDate}
            onChange={(date) => {
              console.log(moment(date).format('ll'));
              setStartDate(date);
            }}
            shouldCloseOnSelect={false}
            dateFormat="MM/dd/yyyy"
          />

        </MuiPickersUtilsProvider>
      </Box>

    </div>
  );
});
