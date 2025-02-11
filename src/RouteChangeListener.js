import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteChangeListener = () => {
    const location = useLocation();

    useEffect(() => {
        window.parent.postMessage(
            { type: 'ROUTE_CHANGE', route: location.pathname }, 
            '*'
        );
      }, [location]);

    return null;
};

export default RouteChangeListener;