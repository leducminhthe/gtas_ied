import { useEffect, useState } from 'react';

type ViewPortType = 'desktop' | 'tablet' | 'mobile';

const useDetectViewPort = () => {
  const [viewPort, setViewPort] = useState<ViewPortType>('desktop');
  const handleResize = () => {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    if (WIDTH > 991) {
      setViewPort('desktop');
    } else if (WIDTH < 767 || (WIDTH > HEIGHT && WIDTH <= 991)) {
      setViewPort('mobile');
    } else if (WIDTH <= 991 && WIDTH >= 767) {
      setViewPort('tablet');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return viewPort;
};

export default useDetectViewPort;
