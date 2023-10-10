import { useDebounceV2 } from 'hooks/useDebounce';
import React, {
  useState, useEffect, forwardRef, useImperativeHandle, useRef,
} from 'react';
import './AsyncValidationEditor.css';

export default forwardRef((props:any, ref):any => {
  const [inputValue, setInputValue] = useState('');
  const [valid, setValid] = useState(true);
  const [validating, setValidating] = useState(false);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<any>();
  const debouncedInputVal = useDebounceV2(inputValue, 100);

  function inputHandler(e:any) {
    setTouched(true);
    setInputValue(e.target.value);
    setValidating(true);
  }

  useEffect(() => {
    // random time between 0 and 1000ms
    //  const timeout = Math.floor(Math.random() * 1000);

    new Promise((resolve, reject) => {
      if (inputValue === '') {
        resolve(false);
      } else {
        setTimeout(() => {
          resolve(props.condition(inputValue));
        }, 0);
      }
    })
      .then((validRes) => {
        setValid(validRes as boolean);
        setValidating(false);
      })
      .catch((err) => console.log(err));
  }, [debouncedInputVal]);

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
    afterGuiAttached: () => {
      setInputValue(props.value);
      inputRef && inputRef.current.focus();
      inputRef && inputRef.current.select();
    },
    isCancelAfterEnd: () => !valid || validating,
  }));

  let loadingElement = null;
  let txtColor = null;

  if (valid) {
    txtColor = 'black';
    loadingElement = <span className="success">✔</span>;
  } else {
    txtColor = '#E91E63';
    loadingElement = <span className="fail">✘</span>;
  }

  if (validating) {
    txtColor = 'gray';
    loadingElement = <span className="loading" />;
  }

  if (!touched) {
    txtColor = 'black';
    loadingElement = null;
  }

  return (
    <div className="async-validation-container">
      <input
        type="text"
        ref={inputRef}
        className="ag-input-field-input ag-text-field-input"
        style={{ color: txtColor, width: '100%' }}
        onChange={inputHandler}
        value={inputValue}
        placeholder={`Enter ${props.column.colId}`}
      />
      {loadingElement}
    </div>
  );
});
