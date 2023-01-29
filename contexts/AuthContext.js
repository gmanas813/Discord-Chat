import { createContext, useState , useContext } from "react";

const AuthContext = createContext({
    userId:null,
    setId : (newUser) => {},
});

const AuthContextComp = ({children}) => {
    const [userId,setId] = useState(null);
    return (
        <AuthContext.Provider value={{userId,setId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextComp;

