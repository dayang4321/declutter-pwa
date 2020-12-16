import React, {
    useState,
    //useEffect,
    useLayoutEffect
} from 'react';
import { useHistory } from "react-router-dom";
import Axios from '../parcHost-axios-base'



export const AuthContext = React.createContext({
    isAuth: false,
    token: null,
    signin: () => {

    },
    logout: () => {
        
    }
});



const AuthContextProvider = props => {

    const authToken = localStorage.getItem('parcHostAuthToken');
    const expTime = localStorage.getItem('parcHostAuthExpiry')
    let isAuthValid = false;
    let authTimeout; 
    
    if (localStorage.getItem('parcHostAuthExpiry')){
        isAuthValid = Date.now() < expTime ? true : false;
        if (isAuthValid) {
            authTimeout = expTime - Date.now()  ;
        }
    }

    const history = useHistory()

    const [isAuthenticated, setIsAuthenticated] = useState(authToken && isAuthValid);

    const [token, setToken] = useState(localStorage.getItem('parcHostAuthToken'));


 

    //console.log(authTimeout/1000/60)
 

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('parcHostAuthToken');
        localStorage.removeItem('parcHostAuthExpiry')
        setIsAuthenticated(false);
       // history.push('/auth')
    }

    const sessLogoutHandler = () => {
        setTimeout(() => {
            logoutHandler()
        },[authTimeout])
    }

    const checkAuthHandler = () => {
       // console.log(isAuthenticated)
        if (authToken && isAuthValid) {
            sessLogoutHandler();
        }
        else {
          logoutHandler()
        }
    }

     useLayoutEffect(()=> {
        checkAuthHandler();
     });
    
    
    const loginHandler = (data) => {

        Axios.post('/auth/login', data)
            .then(
                res => {
                    const token = res.data.data.token.data;
                    const expTime = res.data.data.token.expires_at * 1000;
                    //const expiry = new Date(res.data.data.token.expires_at * 1000);

                    // console.log(expiry)
                    // console.log(res.data);

                    localStorage.setItem('parcHostAuthToken', token);
                    localStorage.setItem('parcHostAuthExpiry', expTime);
                    setToken(token)
                    setIsAuthenticated(true);   
                    history.push('/admin')
                }
        )
            .catch(error => {
                error.response ? alert(error.response.data.message) : alert(error);
            });
    
      //
    }
    

    return (<AuthContext.Provider value={{
        isAuth: isAuthenticated,
        signin: loginHandler,
        logout: logoutHandler,
        token: token
    }}>
        {props.children}
    </AuthContext.Provider>)
}

export default AuthContextProvider


