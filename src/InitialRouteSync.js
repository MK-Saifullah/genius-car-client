import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InitialRouteSync = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Get initial route from URL query params
        const params = new URLSearchParams(window.location.search);
        const initialRoute = params.get('route');

        // ✅ If there's an initial route & it's different, navigate
        if (initialRoute && initialRoute !== location.pathname) {
            navigate(initialRoute, { replace: true });
        }
    }, [location.pathname, navigate]);

    return null; // No UI needed
};

export default InitialRouteSync;
