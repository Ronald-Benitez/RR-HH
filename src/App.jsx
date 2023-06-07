import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import authMiddleware from "./utils/authMiddleware";

import Home from "./pages/Home";
import Areas from "./pages/Areas";
import Employees from "./pages/Employees";
import PayRoll from "./pages/PayRoll";
import Overtime from "./pages/Overtime";
import Bonuses from "./pages/Bonuses";
import Vacations from "./pages/Vacations";
import Positions from "./pages/Positions";
import Candidates from "./pages/Candidates";
import Absences from "./pages/Absences";
import Disabilities from "./pages/Disabilities";
import EvaluationTemplate from "./pages/EvaluationTemplate";

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
        <Route exact path="/bonuses" component={authMiddleware(Bonuses)} />
        <Route exact path="/vacations" component={authMiddleware(Vacations)} />
        <Route exact path="/positions" component={authMiddleware(Positions)} />
        <Route
          exact
          path="/candidates"
          component={authMiddleware(Candidates)}
        />
        <Route exact path="/absences" component={authMiddleware(Absences)} />
        <Route
          exact
          path="/disabilities"
          component={authMiddleware(Disabilities)}
        />
        <Route
          exact
          path="/evaluation-template"
          component={authMiddleware(EvaluationTemplate)}
        />
      </Switch>
    </Router>
  );
}

export default App;
