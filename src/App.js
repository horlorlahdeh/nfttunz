import "./App.css";
import Home from "./pages/Home";
import Activity from "./pages/Activity"
import Gallery from './pages/Gallery'
import Profile from './pages/Profile'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./store";
import { useEffect } from "react";
import { loadUser } from "./actions/users";
import setAuthToken from "./utils/setAuthToken";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
