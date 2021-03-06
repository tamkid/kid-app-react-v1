import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/Header';
import Album from './features/Album';
import ProductFeature from './features/Product';
import Todo from './features/Todo';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Todo} />
        <Route path="/todos" component={Todo} />
        <Route path="/albums" component={Album} />
        <Route path="/products" component={ProductFeature} />
      </Switch>
    </div>
  );
}

export default App;
