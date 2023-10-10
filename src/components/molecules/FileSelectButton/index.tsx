/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useMemo, useCallback, createRef, ChangeEvent, useState, Fragment,
} from 'react';
import {
  Tooltip, CircularProgress,
} from '@mui/material';
import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import useStyles from './style';

type FileSelectButtonProps = {
    setFile: (file: File) => void,
    value?: string,
    accept?: string,
    disabled?: boolean
    loading: boolean
}
const FileSelectButton: React.FC<FileSelectButtonProps> = ({
  setFile, disabled, value = null, accept = null, loading = false,
}) => {
  const ref = useMemo(() => createRef<HTMLInputElement>(), []);
  const classes = useStyles();
  const onClick = useCallback(() => {
    if (ref.current) {
      ref.current.click();
    }
  }, [ref]);
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.item(0)) {
      return;
    }
    setFile(event.target.files.item(0)!);
  }, [setFile]);
  const [isActive, setActive] = useState(true);
  return (
    <>
      <label htmlFor="fileInput">
        <input
          type="file"
          id="fileInput"
          name="fileInput"
          ref={ref}
          style={{ display: 'none' }}
          value={value || ''}
          onChange={onChange}
          accept="*"
          disabled={disabled}
        />
        <Button disabled={disabled} type="button" variant="contained" fullWidth={false} color="primary" style={{ width: 60, height: 40, marginRight: 15 }} onClick={onClick}>

          <Tooltip title="Accept all formats" placement="top">
            <CloudUploadOutlined />
          </Tooltip>
          {/* {loading && (
            <CircularProgress
              size={22}
              color="secondary"
              className={clsx(classes.buttonProgress)}
            />
            )} */}
        </Button>
      </label>
    </>
  );
};
export default FileSelectButton;
