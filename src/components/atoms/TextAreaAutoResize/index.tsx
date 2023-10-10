import * as React from 'react';
import TextField from '@mui/material/TextField';

const EmptyTextarea:React.FC<{}> = () => {
  const [value, setValue] = React.useState('...');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <TextField
      id="outlined-multiline-flexible"
      label="Remark"
      // multiline={true}
      maxRows={4}
      value={value}
      onChange={handleChange}
      style={{ width: '100%' }}
    />
  );
};

export default EmptyTextarea;
