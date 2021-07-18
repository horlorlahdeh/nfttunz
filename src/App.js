import "./App.css";
import Home from "./pages/Home";
import Activity from "./pages/Activity"
import Gallery from './pages/Gallery'
import Profile from './pages/Profile'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/activity' component={Activity} />
          <Route exact path='/gallery' component={Gallery} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
