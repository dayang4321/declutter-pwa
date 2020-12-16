

import Layout from './hoc/Layout/Layout';
import Start from './pages/Start/Start';

import {Switch,Route,Redirect} from 'react-router'

import './App.css';
import Seller from './pages/Seller/Seller';

function App() {

  let routes = (
    <Switch>
      <Route path="/start" exact component={Start} />
      <Route path="/seller" component={Seller} />
      <Redirect to="/start" />
      </Switch>
  );

  return (
    <div className="App">
      <Layout>
        {routes}
     </Layout>
    </div>
  );
}

export default App;
