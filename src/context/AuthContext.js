import React,{useState,useLayoutEffect} from 'react';
import { useHistory } from "react-router-dom";
import Axios from '../declutter-axios-base'



export const AuthContext = React.createContext({
    isAuth: false,
    authLoading: false,
    token: null,

    signin: () => {

    },
    logout: () => {
        
    },
    completed: false
});



const AuthContextProvider = props => {

    const authToken = localStorage.getItem('declutterAuthToken');
    const expTime = localStorage.getItem('declutterAuthExpiry')
    let isAuthValid = false;
    let authTimeout; 
    
    if (localStorage.getItem('declutterAuthExpiry')){
        isAuthValid = Date.now() < expTime ? true : false;
        if (isAuthValid) {
            authTimeout = expTime - Date.now()  ;
        }
    }

    const history = useHistory()

    const [isAuthenticated, setIsAuthenticated] = useState(authToken && isAuthValid);

    const [token, setToken] = useState(localStorage.getItem('declutterAuthToken'));

    const [authLoading, setAuthLoading] = useState(false)

    const [authComplete, setAuthComplete] = useState(false)
 

    //console.log(authTimeout/1000/60)
 

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('declutterAuthToken');
        localStorage.removeItem('declutterAuthExpiry')
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
      console.log(authToken)
        // console.log(isAuthValid)
        if (authToken && isAuthValid) {
            
            sessLogoutHandler();
        }
        else {
          logoutHandler()
        }
    }

     useLayoutEffect(()=> {
        checkAuthHandler();
     }, );
    
    
    const loginHandler = (data) => {

        setAuthLoading(true);
        setAuthComplete(false);

        Axios.post('/auth/register', data)
            .then(
                res => {
                    setAuthLoading(false)
                    setAuthComplete(true);
                    console.log(res.data.data)
                    const token = res.data.data.access_token;
                 //   const expTime = res.data.token.expires_at * 1000;
                    //const expiry = new Date(res.data.data.token.expires_at * 1000);

                    // console.log(expiry)
                    // console.log(res.data);

                    localStorage.setItem('declutterAuthToken', token);
                    localStorage.setItem('declutterAuthExpiry',1640098800000);
                    setToken(token)
                    setIsAuthenticated(true);   
                    history.push('/seller')
                }
        )
            .catch(error => {
                setAuthLoading(false)
                setAuthComplete(true);
                error.response ? alert(error.response.data.message) : alert(error);
            });
    
      //
    }
    

    return (<AuthContext.Provider value={{
        isAuth: isAuthenticated,
        signin: loginHandler,
        logout: logoutHandler,
        authLoading: authLoading,
        token: token,
        completed: authComplete
        } }>
        {props.children}
    </AuthContext.Provider>)
}

export default AuthContextProvider


