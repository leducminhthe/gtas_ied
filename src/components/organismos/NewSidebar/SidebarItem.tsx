/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
import React, { useCallback, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Collapse, Link } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Link as LinkRouter, useParams, matchPath, useLocation,
} from 'react-router-dom';
import clsx from 'clsx';
import useStyles from './styles';
import { SidebarMenu } from './type';

const SidebarItem: React.FC<{
  menuItem: SidebarMenu,
  inset?: boolean
  handleChildMenuSelected?: () => void
}> = ({ menuItem, inset = false, handleChildMenuSelected }) => {
  const classes = useStyles();
  const { companyCode } = useParams<{ companyCode: string }>();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isMenuShow, setIsMenuShow] = useState<boolean>(false);
  const location = useLocation();
  const match = matchPath(location.pathname, menuItem.link || '');

  const handleCollapse = () => {
    setIsMenuShow((prevState) => !prevState);
  };

  const handleSelect = useCallback(() => {
    setIsSelected(true);
    setIsMenuShow(true);
    handleChildMenuSelected?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classnames = clsx(classes.listItem, inset && classes.collapseItem, inset && 'collapseItem', menuItem?.items && 'has-children');

  const isMatchParent = () => (match?.url ? !!menuItem.link?.includes(match?.url) : false);

  useEffect(() => {
    const isMatch = isMatchParent();
    if (isMatch) {
      setIsSelected(true);
      handleChildMenuSelected?.();
    }
    return () => {
      setIsSelected(false);
      setIsMenuShow(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  if (menuItem.anchor) {
    return (
      <ListItem
        button={true}
        className={classnames}
        onClick={handleCollapse}
        selected={isSelected}
      >
        <a href={menuItem.anchor} className={classes.anchorStyle} target="_blank" rel="noreferrer">
          <ListItemText
            inset={inset}
            primary={menuItem.title}
          />
        </a>
      </ListItem>
    );
  }
  return (
    <>
      <ListItem
        button={true}
        className={classnames}
        onClick={handleCollapse}
        selected={isSelected}
      >
        {menuItem.link ? (
          <Link
            component={LinkRouter}
            to={`/${companyCode}${menuItem.link}`}
            className={classes.anchorStyle}
          >
            <ListItemText
              inset={inset}
              className={clsx({
                [classes.listItemTextChild]: menuItem.isChild,
                [classes.listItemText]: !menuItem.isChild,
                [classes.listItemNoPadding]: menuItem.title === 'Home',
              })}
              primary={menuItem.title}
            />
          </Link>
        )
          : (
            <ListItemText
              inset={inset}
              primary={menuItem.title}
              className={clsx({
                [classes.listItemTextChild]: menuItem.isChild,
              })}
            />
          )}

        {menuItem.items && <ArrowDropDownIcon />}
      </ListItem>

      {menuItem.items && (
        <Collapse
          in={isMenuShow}
          timeout="auto"
          // unmountOnExit={false}
        >
          <List
            component="div"
            disablePadding={true}
            className={classes.collapseList}
          >

            {menuItem.items.filter((item) => item.accessible).map((childMenu, childI) => (
              <SidebarItem
                key={childMenu.title + String(childI)}
                menuItem={childMenu}
                inset={true}
                handleChildMenuSelected={handleSelect}
              />
            ))}

          </List>
        </Collapse>
      )}
    </>
  );
};
export default React.memo(SidebarItem);
