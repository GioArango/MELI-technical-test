import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/constants';

const NotFound = () => {

    const navigate = useNavigate();

    const handleReturnToHome = () => {
        navigate(PATHS.SEARCH)
    }
    return (
        <div className={'container-error'}>
            <h1>404 - Página no encontrada</h1>
            <button onClick={handleReturnToHome}>Volver al inicio</button>
        </div>
    )
}

export default NotFound