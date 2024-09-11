import {Navigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthenticatedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={"/auth/login"} replace />;
    }
    
    return (
        <>
            {children}
        </>
    );
};

export default AuthenticatedRoute;
