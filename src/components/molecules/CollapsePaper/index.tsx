/* eslint-disable react/require-default-props */
import { Button, Collapse, Divider } from '@mui/material';
import React, { useState } from 'react';
import PillButton from 'components/atoms/Buttons/PillButton';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { AddCircleOutlineOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import useStyles from './style';

export const PaperCustome = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '2px solid #eae6eb',
  // marginBottom: '0.75rem',
  borderRadius: '0.75rem',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  // height: 60,
  // lineHeight: '60px',
}));

const CustomizedCollapse = styled(Collapse)`
& .MuiCollapse-wrapper {
  width: 100% !important;
  height: 100% !important;
}
& .MuiCollapse-wrapperInner {
  width: 100% !important;
  height: 100% !important;
}
& .MuiCollapse-horizontal {
  width: 100% !important;
  height: 100% !important;
}
& .MuiCollapse-wrapper {
  width: 100% !important;
  height: 100% !important;
}
& .MuiCollapse-vertical{
  width: 100% !important;
  height: 100% !important;
}
width: 100% !important;
height: 100% !important;
`;

const CollapsePaper: React.FC<{ updateCallback?:any,
  AddComponent?:any,
  styleCollapse?:any,
  style?:any,
  title: string,
  children: React.ReactNode,
  defaultOpen?: boolean,
  isHeigh100?: boolean,
  callback?: () => void,
  isToggle?:boolean,
  showInfo?:boolean,
  setShowInfo?:any,
  exportExcel?:any,
  addName?:string
}> = ({
  updateCallback,
  title,
  children,
  defaultOpen = true,
  isHeigh100 = false,
  callback,
  isToggle = false,
  style,
  styleCollapse = {
    height: '100%',
    padding: '12px',
    paddingBottom: '60px',
  },
  AddComponent,
  showInfo,
  setShowInfo,
  exportExcel,
  addName,
}) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <PaperCustome className={`${isHeigh100 && classes.height100}`} style={style}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isToggle ? '0.5rem 1rem' : '0 0 0 1rem',
      }}
      >
        <h4 style={{ margin: 0 }}>{title}</h4>

        {isToggle ? (
          <button
            type="button"
            className={classes.btn}
            onClick={() => {
              if (!showInfo) {
                callback && callback();
              }
              setShowInfo(!showInfo);
            }}
          >
            {showInfo ? <RemoveCircleOutlineOutlined /> : <AddCircleOutlineOutlined />}
          </button>

        ) : (
          <div>
            {updateCallback && (
            <PillButton
              type="button"
              variant="contained"
              fullWidth={false}
              style={{
                margin: '12px', borderRadius: 0, borderTopRightRadius: '0.25rem',
              }}
              onClick={() => {
                updateCallback();
              }}
            >
              <span style={{ display: 'flex' }}><SaveIcon /></span>
              Update
            </PillButton>
            )}
            {AddComponent && (
            <PillButton
              type="button"
              variant="contained"
              fullWidth={false}
              style={{
                margin: '12px', borderRadius: '5px', borderTopRightRadius: '0.25rem',
              }}
              onClick={() => {
                AddComponent();
              }}
            >
              <span style={{ display: 'flex' }}><AddIcon fontSize="small" /></span>
              Add
              {' '}
              {addName || ''}
            </PillButton>
            )}
            {!AddComponent && !updateCallback && (
              <PillButton
                type="button"
                variant="contained"
                customColor="dark"
                fullWidth={false}
                style={{
                  margin: '12px', borderRadius: '5px', borderTopRightRadius: '0.25rem',
                }}
                onClick={() => {
                  history.goBack();
                }}
              >
                Close
              </PillButton>
            )}
            {exportExcel && (
              <PillButton
                type="button"
                variant="contained"
                fullWidth={false}
                style={{
                  margin: '12px',
                  borderRadius: '5px',
                  borderTopRightRadius: '0.25rem',
                  backgroundColor: '#1b5e20',
                  height: '36.5px',
                }}
                onClick={() => {
                  exportExcel();
                }}
              >
                <span style={{
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                  {/*  <i style={{ color: 'white' }} className="fa fa-file-excel-o" aria-hidden="true" /> */}
                  Export Excel
                </span>
              </PillButton>
            )}
          </div>
        )}
      </header>
      {showInfo && <Divider style={{ margin: '0 0.75rem' }} />}
      <CustomizedCollapse
        in={showInfo}
        timeout={0}
        unmountOnExit={true}
        style={{
          padding: '12px', paddingBottom: '60px', ...styleCollapse,
        }}
      >
        {children}
      </CustomizedCollapse>
    </PaperCustome>
  );
};

export default CollapsePaper;
