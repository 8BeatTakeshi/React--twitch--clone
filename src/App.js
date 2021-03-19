import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />

        <Switch>
          <Route exact path="/" component={Games} />
          <Route exact path="/top-streams" component={TopStreams} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
