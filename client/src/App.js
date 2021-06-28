import './App.css';
import Navbar from './Components/Navbar';
// import Drawer from './Components/Drawer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Screens/Home';
import Courses from './Screens/Courses';
import Students from './Screens/Students';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      {/* <Drawer/> */}
      <Switch>
        <Route path="/" exact component={Students} />
      </Switch>
    </Router>
    </>
  );
}

export default App;