import { useState, useEffect } from 'react';

export const breakpoints = {
  phone: 767,
  tablet: 1023,
  pc: 2559
};

export const isDeviceType = () => {
  const [deviceType, setDeviceType] = useState(null);

  useEffect(() => {
    const resize = () => {
      const width = window.innerWidth;
			const doneSize = {
        phone: width <= breakpoints.phone,
        tablet: width > breakpoints.phone && width <= breakpoints.tablet,
        portable: width <= breakpoints.tablet,
        pc: width > breakpoints.tablet && width <= breakpoints.pc,
        tv: width > breakpoints.pc,
        largeScreen: width > breakpoints.tablet,
      };
			
			setDeviceType(doneSize);
    };

		resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return deviceType;
};