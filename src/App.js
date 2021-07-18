import "./App.css";
import Home from "./pages/Home";
import Activity from "./pages/Activity"
import Gallery from './pages/Gallery'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/activity' component={Activity} />
          <Route exact path='/gallery' component={Gallery} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
