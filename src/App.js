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
import tableData1 from "./sample-data/table-data-1";
import tableHeaderData2 from "./sample-data/table-header-2";

import DrawerComponent from "./Components/DrawerComponent/index";
import ItemsExplorerComponent from "./Components/ItemsExplorer/ItemsExplorerComponent";
import ImageUploadComponent from "./Components/ImageUpload/MediaUploadComponent";
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
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/drawer-component"
                    activeClassName="active"
                  >
                    Drawer
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/file-upload"
                    activeClassName="active"
                  >
                    File Upload
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
                  headers={tableHeaderData2}
                  //fetchUrl='http://atic.docswiz.com:3333/documents.json?page={currentPage}&per_page={perPage}'
                  data={tableData1}
                />
              </Route>
              <Route path="/items-explorer">
                <ItemsExplorerComponent />
              </Route>
              <Route path="/drawer-component">
                <DrawerComponent />
              </Route>
              <Route path="/file-upload">
                <ImageUploadComponent uploadUrl="http://localhost:3000/upload" previewUrl="" postData={{entity: 'user', id: 2, field: 'profile_image'}} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
