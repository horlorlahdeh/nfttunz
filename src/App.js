import './App.css';
import Home from './pages/Home';
import Activity from './pages/Activity';
import Market from './pages/Market';
import Profile from './pages/Profile';
import Collectible from './pages/Collectible';
import MarketCollectible from './pages/sub-routes/MarketCollectible';
import MintToken from './pages/MintToken';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './store';
import { useEffect } from 'react';
import { loadUser, getNotifications } from './actions/users';
import setAuthToken from './utils/setAuthToken';
import 'react-toastify/dist/ReactToastify.css';
import { getChainSettings } from './actions/settings';
import PrivateRoute from './components/auth/PrivateRoute';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-h5-audio-player/lib/styles.css';

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getChainSettings());
    store.dispatch(getNotifications())
  }, []);
  return (
    <div className='App'>
      <Router>
        <Provider store={store}>
          <ToastContainer />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/activity' component={Activity} />
            <Route exact path='/market' component={Market} />
            <PrivateRoute path='/profile' component={Profile} />
            <PrivateRoute
              path='/market/:series'
              component={MarketCollectible}
            />
            <PrivateRoute
              exact
              path='/collectible/:series'
              component={Collectible}
            />
            <PrivateRoute exact path='/mint' component={MintToken} />
            <Route path='*' render={() => <h1>404 not found</h1>} />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
