import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import authMiddleware from './utils/authMiddleware';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={authMiddleware(Home)} />
        <Route path="/login" component={AuthPage} />
      </Switch>
    </Router>
  );
}

export default App;
