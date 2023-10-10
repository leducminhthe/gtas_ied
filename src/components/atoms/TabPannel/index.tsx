import * as React from 'react';
import Box from '@mui/material/Box';

type TTabPanel = {
    children:React.ReactNode;
    index:any;
    value:any;
    // eslint-disable-next-line react/require-default-props
    other?:any;
}
const TabPanel:React.FC<TTabPanel> = (props) => {
  const {
    children, index, value, other = {},
  } = props;
  console.log('value === index', value === index, { value, index });
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ width: '100%', height: '100%', padding: 0 }}
      {...other}
    >
      {value === index && (
      <Box sx={{ p: 3 }} style={{ padding: 0, width: '100%', height: '100%' }}>
        {children}
      </Box>
      )}
    </div>
  );
};
export default TabPanel;
