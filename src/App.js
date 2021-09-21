import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import "../node_modules/jquery/dist/jquery";
import "../node_modules/bootstrap/dist/js/bootstrap";
import PasswordFieldComponent from "./Components/PasswordField/PasswordFieldComponent";
import DynamicTableComponent from "./Components/DynamicTable/DynamicTableComponent";

function App() {
  return (
    <div className="container-fluid">
      <div className="row ">
        <Router>
          <div className="col-md-2 app-sidebar py-2 ">
            <h2 className="display-5 mb-4">React Components</h2>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              ></input>
            </div>
            <div>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/password-field"
                    activeClassName="active"
                  >
                    Password Field
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/dynamic-table"
                    activeClassName="active"
                  >
                    Dynamic Table
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-10 py-2">
            <Switch>
              <Route path="/password-field">
                <PasswordFieldComponent />
              </Route>
              <Route path="/dynamic-table">
                <DynamicTableComponent />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
