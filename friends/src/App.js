import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Users from "./components/Users";
import PrivateRoute from "./components/PrivateRoute";
import { useState, useEffect } from "react";
import axiosWithAuth from "./utils/AxiosWithAuth";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    axiosWithAuth()
      .get("/friends")
      .then(function (response) {
        // handle success
        setFriends(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
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
            <Login setIsAuth={setIsAuth} isAuth={isAuth} />
          </Route>
          {/* <Route path="/users">
            <Users />
          </Route> */}
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute
            path="/users"
            component={Users}
            isAuth={isAuth}
            friends={friends}
            setFriends={setFriends}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
