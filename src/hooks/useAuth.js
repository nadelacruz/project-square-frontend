import { createContext, useContext, useMemo, useEffect, useState } from "react";
import StorageService from "../services/StorageService";
import square_api from "../api/square_api";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const ss = new StorageService();

    const location = useLocation();

    var user = ss.getItem('user');

    if (user) {
        user = JSON.parse(user);
    }

    const [home, setHome] = useState("/");

    useEffect(() => {

    }, [location]);

    const login = async (credentials) => {
        const response = await square_api.post('/auth/login', credentials);

        if (response.status === 200) {
            const user = response.data.user;

            ss.storeItem('user', JSON.stringify(user));
            
            return true;
        } else {
            return false;
        }
    };

    const register = async (credentials) => {
        const response = await square_api.post('/auth/register', credentials);

        if (response.status === 201) { // 201 = CREATED
            const user = response.data.user;

            ss.storeItem('user', JSON.stringify(user));

            return true;
        } else {
            return false;
        }
    };

    const logout = async () => {
        const response = await square_api.post('/auth/logout');
        
        ss.removeItem('user');
        
        if (response.status === 200) {  
            return true;
        } else {
            return false;
        }
    };

    const me = async () => {
        const response = await square_api.post('/me');

        if (response.status === 200) {
            const user = response.data.user;

            ss.storeItem('user', JSON.stringify(user));

            return response;
        } else {
            return response;
        }
    };

    const value = useMemo(
        () => ({
            user,
            home,
            login,
            register,
            logout,
            me,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};