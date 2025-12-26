import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// CustomHook Feature: to tracking previous screen and current Screen
export default function usePrevAndCurrentScreenHook() {
  const [prevScreen, setPrevScreen] = useState('');

  const location = useLocation();

  useEffect(() => {
    return () => {
      setPrevScreen(location.pathname);
    };
  }, [location]);

  return { previousScreen: prevScreen, currentScreen: location.pathname };
}
