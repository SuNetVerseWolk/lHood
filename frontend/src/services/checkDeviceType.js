import { useState, useEffect } from 'react';

export const breakpoints = {
  phone: 425,
  tablet: 768,
  pc: 1440,
  tv: 2560,
};

export const isDeviceType = () => {
  const [deviceType, setDeviceType] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newDeviceType = {
        phone: width <= breakpoints.phone,
        tablet: width > breakpoints.phone && width <= breakpoints.tablet,
        portable: width <= breakpoints.tablet,
        pc: width > breakpoints.tablet && width <= breakpoints.pc,
        tv: width > breakpoints.pc && width <= breakpoints.tv,
        largeScreen: width > breakpoints.tablet,
      };
      setDeviceType(newDeviceType);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};