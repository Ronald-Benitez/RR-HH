import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import authMiddleware from './utils/authMiddleware';

import Home from './pages/Home';
import Areas from './pages/Areas';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={AuthPage} />
        <Route exact path="/" component={authMiddleware(Home)} />
        <Route exact path="/areas" component={authMiddleware(Areas)} />
      </Switch>
    </Router>
  );
}

export default App;
