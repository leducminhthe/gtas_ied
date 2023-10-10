import React from 'react';
import { useHistory } from 'react-router-dom';
import PillButton from 'components/atoms/Buttons/PillButton';

const Page403: React.FC = () => {
  const history = useHistory();
  return (
    <div className="container">
      <h1>403</h1>
      <p>access not granted</p>
      <PillButton
        onClick={() => {
          history.push('/app/library');
        }}
        variant="contained"
        color="primary"
      >
        Go home

      </PillButton>
    </div>
  );
};

export default Page403;
