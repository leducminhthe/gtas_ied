/* eslint-disable no-bitwise */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/require-default-props */
import {
  makeStyles,
} from '@mui/styles';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import RestorePageOutlinedIcon from '@mui/icons-material/RestorePageOutlined';
import SaveIcon from '@mui/icons-material/Save';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import { ColDef } from 'ag-grid-community';
import * as React from 'react';

export const styleMenu = makeStyles((theme: any) => ({
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: (theme.palette.text as any)?.label,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

interface IProps {
  reset?: () => void,
  save?: () => void,
  replace?: () => void,
  anchorEl: any,
  handleCloseMenu: () => void,
}

const CustomMenu: React.FC<IProps> = ({
  replace, reset, save, anchorEl, handleCloseMenu,
}) => {
  const styleMenuGlobal = styleMenu();

  return (
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={() => {
        save && save();
        handleCloseMenu();
      }}
      >
        <SaveIcon className={styleMenuGlobal.profileMenuIcon} />
        Save
      </MenuItem>
      <MenuItem
        onClick={() => {
          replace && replace();
          handleCloseMenu();
        }}
        disableRipple={true}
      >
        <RestorePageOutlinedIcon className={styleMenuGlobal.profileMenuIcon} />
        Restore
      </MenuItem>
      <MenuItem
        onClick={() => {
          reset && reset();
          handleCloseMenu();
        }}
        disableRipple={true}
      >
        <RefreshOutlinedIcon className={styleMenuGlobal.profileMenuIcon} />
        Reset
      </MenuItem>
    </StyledMenu>
  );
};

export default CustomMenu;
