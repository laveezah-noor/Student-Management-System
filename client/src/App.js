import './App.css';
import {
  BrowserRouter as Router, 
  Switch, 
  Route} from 'react-router-dom'
import Dashboard from './Screens/Dashboard';
import Home from './Screens/Home';
import Course from './Screens/Course';
import Instructor from './Screens/Instructor';
import Students from './Screens/Students';
import Sidebar from './Components/Sidebar';

function App() {
  
  return (
    <div className="App">
   
    <Router>
      <Sidebar/>
      <div className="Screens">
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/course" exact component={Course} />
        <Route path="/instructor" exact component={Instructor} />
        <Route path="/student" exact component={Students} />
        <Route path="/home" exact component={Home} />
      </Switch>
      </div>

    </Router>
    </div>
  );
}

export default App;