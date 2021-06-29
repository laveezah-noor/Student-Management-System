import './App.css';
import {
  BrowserRouter as Router, 
  Switch, 
  Route} from 'react-router-dom'
import Home from './Screens/Home';
import Login from './Screens/Login';


function App() {
  
  return (
    <>
    <Router>
      
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
    </>
  );
}

export default App;