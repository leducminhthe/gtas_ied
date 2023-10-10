import React, { useState } from 'react';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Inbox as InboxIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import classnames from 'clsx';
import { useLayoutState } from 'context/LayoutContext';
// styles
import useStyles, { StyledAnchor } from './styles';

// components
import Dot from '../Dot';
import './index.css';

const ListItemRef:React.FC<any> = (({ isLinkActive, callback, ...rest }:any) => {
  //  const layoutState = useLayoutState();
  const [init, setInit] = React.useState(false);
  const classes = useStyles({ toggle: false });
  const ref = React.useRef<HTMLLIElement>(null);
  React.useEffect(() => {
    if (ref?.current && !init) {
      ref.current.onmouseenter = ((_event:any) => {
        ref.current?.classList.add('hovered');
      });
      ref.current.onmouseleave = ((_event:any) => {
        ref.current?.classList.remove('hovered');
        // ref.current?.classList.remove('hovered');
      });
      setInit(true);
    }
  }, [isLinkActive]);
  return (
    <li ref={ref} className={`${classes.className} ${isLinkActive ? 'active' : ''}`}>
      <ListItem
        {...rest}
        onClick={(e) => {
          if (callback) {
            e.preventDefault();
            callback();
          }
        }}
      >
        {rest.children}
      </ListItem>
    </li>
  );
});
export default function SidebarLink({
  link,
  icon,
  label,
  children,
  location,
  isSidebarOpened,
  nested,
  type,
  callback,
}: any) {
  const layoutState = useLayoutState();
  const classes = useStyles({ toggle: (layoutState as any).isDarkMode });

  const [isOpen, setIsOpen] = useState(false);
  const isLinkActive = link
    && (location.pathname === link || location.pathname.indexOf(link) !== -1);

  if (type === 'title') {
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );
  }

  if (type === 'divider') return <Divider className={classes.divider} />;
  if (link && link.includes('http')) {
    return (
      <ListItemRef
        button={true}
        className={`${classes.link}`}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        isLinkActive={isLinkActive}
        disableRipple={true}
      >
        <a className={classes.externalLink} href={link}>
          <ListItemIcon
            className={classnames(classes.linkIcon, {
              [classes.linkIconActive]: isLinkActive,
            })}
          >
            {nested ? <Dot color={isLinkActive && 'primary'} /> : icon}
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classnames(classes.linkText, {
                [classes.linkTextActive]: isLinkActive,
                [classes.linkTextHidden]: !isSidebarOpened,
              }),
            }}
            primary={label}
          />
        </a>
      </ListItemRef>
    );
  }
  if (!children) {
    return (
      <ListItemRef
        button={true}
        component={link && Link}
        to={link}
        className={classes.link}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        callback={callback}
        isLinkActive={isLinkActive}
        disableRipple={true}
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {nested ? <Dot color={isLinkActive && 'primary'} /> : icon}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItemRef>
    );
  }

  return (
    <>
      <ListItemRef
        button={true}
        component={link && Link}
        onClick={toggleCollapse}
        className={classes.link}
        to={link}
        disableRipple={true}
        isLinkActive={isLinkActive}
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon || <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItemRef>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit={true}
          className={classes.nestedList}
        >
          <List component="div" disablePadding={true}>
            {children
              .filter((item: { accessible: any; }) => item.accessible)
              .map((childrenLink: any) => (
                <SidebarLink
                  key={childrenLink && childrenLink.link}
                  location={location}
                  isSidebarOpened={isSidebarOpened}
                  classes={classes}
                  nested={true}
                  {...childrenLink}
                />
              ))}
          </List>
        </Collapse>
      )}
    </>
  );

  // ###########################################################

  function toggleCollapse(e: { preventDefault: () => void; }) {
    if (isSidebarOpened) {
      // e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
