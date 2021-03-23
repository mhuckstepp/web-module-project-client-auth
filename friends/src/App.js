import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Users from "./components/Users";
import PrivateRoute from "./components/PrivateRoute";
import { useState, useEffect } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  console.log(localStorage.getItem("token"));

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <Login setIsAuth={setIsAuth} />
          </Route>
          {/* <Route path="/users">
            <Users />
          </Route> */}
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/users" component={Users} isAuth={isAuth} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
