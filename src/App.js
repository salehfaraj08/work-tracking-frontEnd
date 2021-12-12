import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import UserDisplay from './components/userProfile/UserDisplay';
import Signin from './components/signin/Signin';
import AdminDisplay from './components/adminProfile/AdminDisplay';
import AddWorker from './components/addWorker/AddWorker';
import StartShift from './components/startShift/StartShift';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin}/>
          <Route exact path='/admin' component={AdminDisplay}/>
          <Route exact path='/user' component={UserDisplay}/>
          <Route exact path='/admin/addWorker' component={AddWorker}/>
          <Route exact path='/startShift' component={StartShift}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
