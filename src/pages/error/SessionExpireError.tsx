import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

const SessionExpireError: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push('/login');
    }, 5000);
  });
  return <div>session expire</div>;
};

export default SessionExpireError;
