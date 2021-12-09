import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import userDisplay from './components/userDisplay'
import Signin from './components/signin/Signin';
import adminDisplay from './components/adminDisplay';
import AddWorker from './components/addWorker/AddWorker';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin}/>
          <Route exact path='/admin' component={adminDisplay}/>
          <Route exact path='/user' component={userDisplay}/>
          <Route exact path='/admin/addWorker' component={AddWorker}/>

          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
