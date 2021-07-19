import "./App.css";
import Home from "./pages/Home";
import Activity from "./pages/Activity"
import Gallery from './pages/Gallery'
import Profile from './pages/Profile'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";


function App() {
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
