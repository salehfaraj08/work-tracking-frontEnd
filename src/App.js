import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import userDisplay from './components/userDisplay'
import Signin from './components/signin/Signin';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
