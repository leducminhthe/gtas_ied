/* eslint-disable react/require-default-props */
import { Button, Tooltip } from '@mui/material';
import { useLayoutState } from 'context/LayoutContext';
import useWindowSize from 'hooks/useWindowSize';
import React from 'react';
import useStyles from './styles';

const CustomReponsiveButton: React.FC<{
  label: string;
  Icon: any;
  shortcutText?: string;
}> = ({
  label,
  Icon,
  shortcutText,
}) => {
  const layoutState: any = useLayoutState();
  const [widthWindow] = useWindowSize(
    50,
    (layoutState as any)?.isSidebarOpened ?? false,
  );
  const classes = useStyles();

  const renderLabel = () => {
    if (widthWindow >= 1450) {
      return label;
    }
    if (widthWindow >= 1200 && (layoutState as any)?.isSidebarOpened) {
      return shortcutText || label;
    }
    // if (widthWindow >= 946 && !(layoutState as any)?.isSidebarOpened) {
    //   return shortcutText || label;
    // }
    return shortcutText;
  };

  return (
    <Tooltip
      title={<span style={{ fontSize: '15px' }}>{label}</span>}
      placement="top"
    >
      <Button
        // className={classes.cssButton2}
        startIcon={Icon}
        variant="text"
        style={{
          height: '100%',
          color: `${layoutState.isDarkMode ? 'white' : 'black'}`,
        }}
      >
        {renderLabel()}
      </Button>
    </Tooltip>
  );
};

export default CustomReponsiveButton;
