import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)


    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <>
        {location.state?.canGoBack && (
            <button type="button" onClick={goBack}>
                {'< Go back'}
            </button>
        )}
        </>
  )
}

export default BackButton