import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/Header';
import Album from './features/Album';
import Todo from './features/Todo';
import { useEffect } from 'react';
import productApi from './api/productApi';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Todo} />
        <Route path="/todos" component={Todo} />
        <Route path="/albums" component={Album} />
      </Switch>
    </div>
  );
}

export default App;
