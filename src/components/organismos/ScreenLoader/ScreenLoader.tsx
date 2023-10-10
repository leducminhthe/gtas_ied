import React, { CSSProperties, forwardRef } from 'react';

import LoadingPage from './LoadingPage';

type IParams = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  title?: string;
  loading?: boolean;
  styleOverride?: CSSProperties
};
const Page = forwardRef<IParams, any>((props, ref) => {
  const {
    children, title = '', isLoading, styleOverride, ...rest
  } = props;

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div ref={ref} {...rest} style={{ height: 'calc(95vh - 79px)', ...styleOverride }}>
      <title>{title}</title>
      {children}
    </div>
  );
});

export default Page;
