import React, { useState } from 'react';
import {
  Typography,
} from '@mui/material';

const MenuList: React.FC<{
  item: any,
  classes: any
}> = ({ item, classes }) => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuVisible(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      <Typography variant="h6" className={classes.textTitle}>{item.label}</Typography>
      {isSubMenuVisible && (
        <div
          className="submenu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            zIndex: 1,
            width: '200px',
          }}
        >
          {
            item.children.map((child: any) => (
              <Typography variant="h6" sx={{ color: 'black' }}>
                {child.label}
              </Typography>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default React.memo(MenuList);
