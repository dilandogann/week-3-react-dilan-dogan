import React, { useState } from 'react';
import './App.css';
import RickAndMortyList from './components/RickAndMortyList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CardComp from './components/RickAndMortyCardDetail';

function App() {
  const [item, setItem] = useState();
  const getSelectedItem = (item) => {
    setItem(item)
    console.log(item)
}
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/detail" render={props => (<CardComp {...item}/>)}/>
            <Route path="/">
              <RickAndMortyList setSelectedItem={getSelectedItem}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
