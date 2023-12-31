/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import { Tooltip } from '@mui/material';
import { AppContext } from 'context/GridContext';
import { useLayoutState } from 'context/LayoutContext';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { styled } from '@mui/material/styles';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import './style.css';

export function BpCheckbox(props: any, readOnly?:boolean) {
  const { checkList, selectValue, unSelectValue } = useContext(AppContext);
  const { value } = props;
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
     /*  readOnly={readOnly || false} */
      checked={checkList.includes(value)}
      disableRipple={true}
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      onChange={(event: any) => {
        event.stopPropagation();
        if (selectValue && !checkList.includes(value)) {
          selectValue(value);
        }
        if (unSelectValue && checkList.includes(value)) {
          unSelectValue(value);
        }
      }}
      {...props}
    />
  );
}
export const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
      + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 "
      + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

export function ReadOnlyCheckbox(props: any) {
  const { value } = props;
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      checked={value}
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
    />
  );
}
const CustomHeader: React.FC<any> = (props) => {
  const layoutState: any = useLayoutState();
  const {
    hiddenPinColumn, listPinColumn, pinColumn, isSelectAll, selectAllFunc, selectAllValue, listActiveMenu, hiddenSelect, checkList, selectValueRedux,
  } = useContext(AppContext);
  const [ascSort, setAscSort] = useState('inactive');
  const [activeSort, setActiveSort] = useState<'asc' | 'desc' | ''>('');
  const [descSort, setDescSort] = useState('inactive');
  const divRef = useRef<HTMLDivElement | null>(null);
  const [noSort, setNoSort] = useState('inactive');
  const refButton = useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? 'active'
        : 'inactive',
    );
  };

  const onSortRequested = (order: any, event: any) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
    if (divRef.current && divRef.current.parentElement) {
      divRef.current.parentElement.style.width = '100%';
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
      }}
      ref={divRef}
    >
      {hiddenPinColumn && (
        <Tooltip title="Fix Column" placement="top">
          <div
            onClick={() => {
              pinColumn(props.column.colId);
            }}
            className={`${listPinColumn?.includes(props.column.colId) && 'active'}`}
            style={{ minHeight: '18px', minWidth: '18px', paddingLeft: '3px' }}
          >
            <i className="fa fa-thumb-tack" aria-hidden="true" />
          </div>
        </Tooltip>
      )}

      {isSelectAll && (props.column.colId === 'idReplace') && (
        <BpCheckbox
          style={{ color: `${layoutState.isDarkMode ? 'white' : 'rgba(0, 0, 0, 0.54)'}` }}
          checked={selectAllValue}
          onChange={(event: any) => {
            if (selectAllFunc) {
              selectAllFunc(event.target.checked);
            }
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      )}
      <Tooltip title="Click To Sort" placement="top">
        <div
          className="customHeaderLabel"
          onClick={(event) => {
            if (!props.enableSorting) {
              return;
            }
            switch (activeSort) {
              case '':
                onSortRequested('asc', event);
                setActiveSort('asc');
                break;
              case 'asc':
                onSortRequested('desc', event);
                setActiveSort('desc');
                break;
              case 'desc':
                onSortRequested('', event);
                setActiveSort('');
                break;
              default:
                onSortRequested('', event);
                setActiveSort('');
                break;
            }
          }}
          onTouchEnd={(event) => {
            switch (activeSort) {
              case '':
                onSortRequested('asc', event);
                setActiveSort('asc');
                break;
              case 'asc':
                onSortRequested('desc', event);
                setActiveSort('desc');
                break;
              case 'desc':
                onSortRequested('', event);
                setActiveSort('');
                break;
              default:
                onSortRequested('', event);
                setActiveSort('');
                break;
            }
          }}
        >
          {props.displayName?.split('\n').map((item:any) => <span style={{ display: 'block', textAlign: 'center' }}>{item}</span>)}
        </div>
      </Tooltip>
      {props.enableMenu && (
      <Tooltip title="Filter" placement="top">
        <div
          ref={refButton}
          className="customHeaderMenuButton"
          onClick={() => onMenuClicked()}
          style={{
            minHeight: '18px', minWidth: '18px', color: listActiveMenu?.includes(props?.column?.colDef.field ?? null) ? 'black' : 'inherit', display: 'flex',
          }}
        >
          <ViewHeadlineIcon />
        </div>
      </Tooltip>
      )}
      {props.enableSorting && (
        <>
          {activeSort === 'asc' && (
            <div
              className={`customSortDownLabel ${ascSort}`}
              style={{ minHeight: '18px', minWidth: '18px' }}
            >
              <i className="fa fa-arrow-down" aria-hidden="true" />
            </div>
          )}
          {activeSort === 'desc' && (
            <div
              className={`customSortUpLabel ${descSort}`}
              style={{ minHeight: '18px', minWidth: '18px' }}
            >
              <i className="fa fa-arrow-up" aria-hidden="true" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const CustomHeaderNotContext: React.FC<any> = (props) => {
  const [ascSort, setAscSort] = useState('inactive');
  const [activeSort, setActiveSort] = useState<'asc' | 'desc' | ''>('');
  const [descSort, setDescSort] = useState('inactive');
  const [noSort, setNoSort] = useState('inactive');
  const refButton = useRef(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? 'active'
        : 'inactive',
    );
  };

  const onSortRequested = (order: any, event: any) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
    if (divRef.current && divRef.current.parentElement) {
      divRef.current.parentElement.style.width = '100%';
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
      }}
      ref={divRef}
    >
      {props.enableMenu && (
        <Tooltip title="Filter" placement="top">
          <div
            ref={refButton}
            className="customHeaderMenuButton"
            onClick={() => onMenuClicked()}
            style={{ minHeight: '18px', minWidth: '18px', marginRight: '0.5rem' }}
          >
            <i className={`fa ${props.menuIcon}`} />
          </div>
        </Tooltip>
      )}
      <Tooltip title="Click To Sort" placement="top">
        <div
          className="customHeaderLabel"
          onClick={(event) => {
            switch (activeSort) {
              case '':
                onSortRequested('asc', event);
                setActiveSort('asc');
                break;
              case 'asc':
                onSortRequested('desc', event);
                setActiveSort('desc');
                break;
              case 'desc':
                onSortRequested('', event);
                setActiveSort('');
                break;
              default:
                onSortRequested('', event);
                setActiveSort('');
                break;
            }
          }}
          onTouchEnd={(event) => {
            switch (activeSort) {
              case '':
                onSortRequested('asc', event);
                setActiveSort('asc');
                break;
              case 'asc':
                onSortRequested('desc', event);
                setActiveSort('desc');
                break;
              case 'desc':
                onSortRequested('', event);
                setActiveSort('');
                break;
              default:
                onSortRequested('', event);
                setActiveSort('');
                break;
            }
          }}
        >
          {props.displayName}
        </div>
      </Tooltip>
      {props.enableSorting && (
        <>
          {activeSort === 'asc' && (
            <div
              className={`customSortDownLabel ${ascSort}`}
              style={{ minHeight: '18px', minWidth: '18px' }}
            >
              <i className="fa fa-arrow-down" aria-hidden="true" />
            </div>
          )}
          {activeSort === 'desc' && (
            <div
              className={`customSortUpLabel ${descSort}`}
              style={{ minHeight: '18px', minWidth: '18px' }}
            >
              <i className="fa fa-arrow-up" aria-hidden="true" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default CustomHeader;
