import React from 'react';
import { VERSION } from 'types/global';
import { getLocalStorage } from 'utils/authUtil';

export const getServerName = () => {
  const serverName = getLocalStorage('sever') === '1' ? 'test' : 'live';
  return serverName.replace(serverName[0], serverName[0].toUpperCase());
};

export default function ServerStatus(props: any) {
  return (
    <div>
      <div style={{
        fontWeight: 700, height: '100%', display: 'flex', alignItems: 'center',
      }}
      >
        <span style={{ fontStyle: 'italic', fontWeight: 500 }}>
          {'Version: '}
        </span>
        {VERSION}
        ,
        <span style={{ fontStyle: 'italic', fontWeight: 500 }}>
          {' Server: '}
        </span>
        {`${getServerName()}`}
      </div>
    </div>
  );
}
