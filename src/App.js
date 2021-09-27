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
import tableHeaderData1 from "./sample-data/table-header-1";
import tableData1 from "./sample-data/table-data-1";
import ItemsExplorerComponent from "./Components/ItemsExplorer/ItemsExplorerComponent";
import ItemsLevel1 from "./sample-data/items-level-1";

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
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/items-explorer"
                    activeClassName="active"
                  >
                    Items Explorer
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
                <DynamicTableComponent
                  headers={tableHeaderData1}
                  data={tableData1}
                  idKey="id"
                  editAction="/user/edit/{id}"
                  viewAction="/user/{id}"
                  deleteAction="/user/delete/{id}"
                />
              </Route>
              <Route path="/items-explorer">
                <ItemsExplorerComponent 
                  items={ItemsLevel1}  
                  fetchSubitemsUrl={`http://rails.docswiz.com:3333/projects/1/items/{id}/children.json`}    
                  listLevel1Icon='<i class="far fa-folder"></i>'
                  listLevel2Icon='<i class="far fa-file-alt"></i>'            
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
