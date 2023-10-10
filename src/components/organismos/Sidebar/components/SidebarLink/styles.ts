/* eslint-disable no-unused-vars */
import { makeStyles, styled } from '@mui/styles';

export const StyledAnchor = styled('li')(({ theme }:any) => ({
  '&:last-child': {
    marginTop: 0,
  },
  '&.hovered a::after, &.active a::after': {
    content: '',
    position: 'absolute',
    right: 0,
    bottom: '-50px',
    width: '50px',
    height: '50px',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    boxShadow: '35px -35px 0 10px #F6F7FF',
    pointerEvents: 'none',
    zIndex: 1,
  },
  '&.hovered a::before,&.active a::before': {
    content: '',
    position: 'absolute',
    right: 0,
    top: '-50px',
    width: '50px',
    height: '50px',
    zIndex: 1,
    backgroundColor: 'transparent',
    borderRadius: '50%',
    boxShadow: '35px 35px 0 10px #F6F7FF',
    pointerEvents: 'none',
    /* transition: all 0.15s linear; */
  },
  '&.active a': {
    backgroundColor: '#F6F7FF',
    color: '#2a2185',
  },
  '&.hovered a': {
    backgroundColor: '#F6F7FF',
    color: '#2a2185',
  },
}));

export default makeStyles((theme:any) => ({
  link: (props) => ({
    // transition: 'all 0.2s linear',
    padding: '0 !important',
    textDecoration: 'none',
    position: 'relative',
    width: '100%',
    listStyle: 'none',
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    color: theme.palette.text.default,
    transition: 'unset',
    '&:hover, &:focus': {
      transition: 'unset',
      // backgroundColor: theme.palette.background.light,
      backgroundColor: !props.toggle
        ? theme.palette.background.light
        : theme.palette.darkMode.background.lightDark,
      color: `${theme.palette.primary.main} !important`,
    },
  }),
  className: {
    position: 'relative',
    // '&.activeLi a:before': {
    //   content: '',
    //   position: 'absolute',
    //   right: 0,
    //   top: '-50px',
    //   width: '50px',
    //   height: '50px',
    //   backgroundColor: 'transparent',
    //   borderRadius: '50%',
    //   boxShadow: '35px 35px 0 10px #F6F7FF',
    //   pointerEvents: 'none',
    // },
    // '&.activeLi a:after': {
    //   content: '',
    //   position: 'absolute',
    //   right: 0,
    //   top: '-50px',
    //   width: '50px',
    //   height: '50px',
    //   backgroundColor: 'transparent',
    //   borderRadius: '50%',
    //   boxShadow: '35px -35px 0 10px #F6F7FF',
    //   pointerEvents: 'none',
    // },
  },
  externalLink: (props) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
  }),
  linkActive: (props:any) => ({
    backgroundColor: !props.toggle
      ? theme.palette.background.light
      : theme.palette.darkMode.background.lightDark,
    zIndex: 99,
    // color: '#2a2185 !important',
  }),
  linkNested: (props) => ({
    paddingLeft: '16px !important',
    '&:hover, &:focus': {
      backgroundColor: '#FFFFFF',
    },
  }),
  linkIcon: {
    // marginRight: theme.spacing(1),
    zIndex: 99,
    color: 'inherit',
    transition: theme.transitions.create('color'),
    width: 60,
    height: 50,
    minWidth: 'unset',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      width: '1.75em !important',
      height: '1.75em !important',
    },
  },
  linkIconActive: {
    color: theme.palette.primary.main,
  },
  linkRoot: {
    opacity: 1,
  },
  linkText: (props:any) => ({
    padding: '0 10px',
    // color: theme.palette.text.secondary,
    // ? theme.palette.darkMode.color.light
    // : theme.palette.darkMode.color.dark,
    // transition: 'all 0.2s linear',
    fontSize: 14,
    height: '50px',
    lineHeight: '50px',
    textAlign: 'start',
    whiteSpace: 'nowrap',
    letterSpacing: '1px',
  }),
  linkTextActive: {
    color: theme.palette.text.primary,
    '&::before': {
      content: '',
      position: 'absolute',
      right: 0,
      top: '-50px',
      width: '50px',
      height: '50px',
      backgroundColor: 'transparent',
      borderRadius: '50%',
      boxShadow: '35px 35px 0 10px #fff',
      pointerEvents: 'none',
    },
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    // paddingLeft: theme.spacing(1) + 10,
    paddingLeft: '16px !important',
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: '#D8D8D880',
  },
}));
