
import React,{useContext} from 'react';
import Layout from './hoc/Layout/Layout';
import Start from './pages/Start/Start';
import {Switch,Route,Redirect} from 'react-router'
import { AuthContext } from "./context/AuthContext";
import './App.css';
import Seller from './pages/Seller/Seller';

function App() {



  const authContext = useContext(AuthContext);

  let routes = (
    <Switch>
      <Route path="/start" exact component={Start} />
      <Redirect to="/start" />
      </Switch>
  );

  if (authContext.isAuth) {
    routes = (
      <Switch>
        <Route path="/seller" exact component={Seller} />
        <Redirect to="/seller" />
        </Switch>
    );
  }

  return (
    <div className="App">
      <Layout>
        {routes}
     </Layout>
    </div>
  );
}

export default App;
