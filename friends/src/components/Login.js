import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuth, isAuth }) => {
  const history = useHistory();
  const [form, setForm] = useState({
    username: "Lambda School",
    password: "i<3Lambd4",
  });
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsFetching(true);
    axios
      .post("http://localhost:5000/api/login", form)
      .then(function (response) {
        localStorage.setItem("token", response.data.payload);
        setIsFetching(false);
        setIsAuth(true);
        history.push("/users");
      })
      .catch(function (error) {
        console.log(error.response);
        setIsFetching(false);
      });
  };

  if (localStorage.getItem("token")) {
    history.push("/");
  }
  return (
    <div>
      {isFetching ? (
        <h1>'LOADING'</h1>
      ) : (
        <form onSubmit={submitHandler}>
          <label>
            {" "}
            username
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            {" "}
            password
            <input
              name="password"
              type="text"
              value={form.password}
              onChange={handleChange}
            ></input>
          </label>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};

export default Login;
