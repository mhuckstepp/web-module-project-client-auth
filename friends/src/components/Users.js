import React from "react";
import { withRouter } from "react-router-dom";
import axiosWithAuth from "../utils/AxiosWithAuth";
import FrienAddForm from "./FriendAddForm";
import { useState } from "react";

const Users = ({ friends, setFriends }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingID, setEditingID] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const deleteFriend = (id) => {
    axiosWithAuth()
      .delete(`/friends/${id}`)
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

  const editFriend = (id) => {
    setEditingID(id);
    setIsEditing(true);
    const friendIndex = friends.findIndex((f) => f.id == id);
    setForm(friends[friendIndex]);
  };

  const submitEditFriend = (id) => {
    console.log("run submit");
    axiosWithAuth()
      .put(`/friends/${id}`, form)
      .then(function (response) {
        console.log(response.data);
        setFriends(response.data);
        setIsEditing(false);
        setEditingID("");
        setForm({
          name: "",
          age: "",
          email: "",
        });
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
      <h1>USERS PAGE, private route</h1>
      {friends.map((friend) => {
        return (
          <div>
            <p key={friend.email}>
              {" "}
              {friend.name} {friend.age}{" "}
            </p>
            <button key={friend.name} onClick={() => deleteFriend(friend.id)}>
              {" "}
              Delete Friend
            </button>
            {isEditing && friend.id === editingID ? (
              <button
                key={friend.age}
                onClick={() => submitEditFriend(friend.id)}
              >
                {" "}
                Submit updated Friend
              </button>
            ) : (
              <button key={friend.age} onClick={() => editFriend(friend.id)}>
                {" "}
                Edit Friend
              </button>
            )}
          </div>
        );
      })}
      <FrienAddForm
        setFriends={setFriends}
        form={form}
        handleChange={handleChange}
        isEditing={isEditing}
      />
    </div>
  );
};

export default withRouter(Users);
