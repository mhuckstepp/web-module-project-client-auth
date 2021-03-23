import React from "react";
import { useState } from "react";
import axiosWithAuth from "../utils/AxiosWithAuth";

const FrienAddForm = ({ setFriends, handleChange, form, isEditing }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/friends", form)
      .then(function (response) {
        setFriends(response.data);
        // setIsFetching(false);
        // history.push("/users");
      })
      .catch(function (error) {
        console.log(error.response);
        // setIsFetching(false);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          {" "}
          name
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          {" "}
          age
          <input
            name="age"
            type="text"
            value={form.age}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          {" "}
          email
          <input
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
          ></input>
        </label>
        {isEditing ? null : <button>Submit</button>}
      </form>
    </div>
  );
};

export default FrienAddForm;
