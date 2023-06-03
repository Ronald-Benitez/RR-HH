import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import authMiddleware from "./utils/authMiddleware";

import Home from "./pages/Home";
import Areas from "./pages/Areas";
import Employees from "./pages/Employees";
import PayRoll from "./pages/PayRoll";
import Overtime from "./pages/Overtime";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={AuthPage} />
        <Route exact path="/" component={authMiddleware(Home)} />
        <Route exact path="/areas" component={authMiddleware(Areas)} />
        <Route exact path="/employees" component={authMiddleware(Employees)} />
        <Route exact path="/payroll" component={authMiddleware(PayRoll)} />
        <Route exact path="/overtime" component={authMiddleware(Overtime)} />
      </Switch>
    </Router>
  );
}

export default App;
