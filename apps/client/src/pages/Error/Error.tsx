import { PATHS } from "@/constants";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    const handleReturnToHome = () => {
        navigate(PATHS.SEARCH)
    }
    return (
        <div className={'container-error'}>
            <h1>Oops! ha ocurrido un error</h1>
            <button onClick={handleReturnToHome}>Volver al inicio</button>
        </div>
    )
}

export default Error