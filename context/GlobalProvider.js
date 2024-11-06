import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from "../lib/appwrite";
import { router } from 'expo-router';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLoggedin(true);
                    setUser(res);
                    router.replace('/home');  // Navigate to home if user is logged in
                } else {
                    setIsLoggedin(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider value={{
            isLoggedin,
            setIsLoggedin,
            user,
            setUser,
            isLoading,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
