import tinycolor from 'tinycolor2';

const mainBackground = '#2a2185';
const primary = '#2a2185';
const secondary = '#FF5C93';
const warning = '#FFC260';
const success = '#3CD4A0';
const info = '#9013FE';
const border = '#bdbec4';
const labelText = '#888888';

const lightenRate = 7.5;
const darkenRate = 15;

const defaultTheme:any = {
  palette: {
    darkMode: {
      background: {
        main: mainBackground,
        light: '#131722',
        dark: mainBackground,
        lightDark: '#444951',
        default: '#fff',
      },
      color: {
        light: '#FFF',
        dark: '#000',
        main: '#222',
      },
    },
    loginTheme: {
      input: {
        color: '#3b4044',
        background: '#0a0f14',
      },
      background: {
        backgroundColor: '#171b26',
      },
    },
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF',
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      default: '#fff',
      primary: '#4A4A4A',
      secondary: '#4A4A4A',
      hint: '#B9B9B9',
      label: labelText,
    },
    background: {
      default: '#F6F7FF',
      light: '#F3F5FF',
    },
    tableBackground: '#fff',
    border: {
      default: border,
      light: '#e0e0e0',
    },
    paginationButton: {
      normal: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.26)',
    },
  },
  customShadows: {
    widget:
      '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetDark:
      '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetWide:
      '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: '#4A4A4A1A',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: mainBackground,
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
      },
    },
    MuiSelect: {
      icon: {
        color: '#B9B9B9',
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: '#F3F5FF !important',
          '&:focus': {
            backgroundColor: '#F3F5FF',
          },
        },
      },
      button: {
        '&:hover, &:focus': {
          backgroundColor: '#F3F5FF',
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white',
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(224, 224, 224, .5)',
        paddingLeft: 24,
      },
      head: {
        fontSize: '0.95rem',
      },
      body: {
        fontSize: '0.95rem',
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '14px',
      },
    },
    PrivateSwitchBase: {
      root: {
        marginLeft: 10,
      },
    },
    MuiButton: {
      root: {
        // Some CSS
        color: 'rgba(0, 0, 0, 0.6)',
      },
    },
  },
};

export default defaultTheme;
