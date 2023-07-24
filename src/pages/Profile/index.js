import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css";

const Profile = () => {
  // Fetching the user data from Auth0
  const { user } = useAuth0();

  // State variables to store user input and form status
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (address === "" || age === "") {
      alert("Please fill in all the required data.");
    } else {
      try {
        // Sending form data to the server
        const response = await fetch(
          "https://gotravel2-default-rtdb.firebaseio.com/profiles.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName: user && user.name,
              emailId: user && user.email,
              dob: age,
              gender: gender,
              address: address,
            }),
          }
        );

        if (response.ok) {
          // If data is saved successfully, mark the form as submitted
          setSubmitted(true);
          alert("Data is saved successfully.");
        } else {
          throw new Error("Failed to save data.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while saving the data.");
      }
    }
  };

  // Functions to handle user input changes for age and address fields
  const handleInputChange3 = (event) => {
    if (!submitted && !editing) {
      setAddress(event.target.value);
    }
  };

  const handleInputChange4 = (event) => {
    if (!submitted && !editing) {
      setAge(event.target.value);
    }
  };

  const handleInputChange5 = (event) => {
    if (!submitted && !editing) {
      setGender(event.target.value);
    }
  };

  // Function to enable form editing mode
  const handleEdit = () => {
    setSubmitted(false);
    setEditing(true);
  };

  return (
    <div className="container">
      <div className="profile">
        <div className="profileCard">
          {user && <img src={user.picture} alt="User Profile" />}
          {user && <div>{user.name}</div>}
          <p>
            Personal Profile <br />
          </p>
          <div>
            <button className="button">Follow</button>
          </div>
        </div>
      </div>
      <div className="formNew">
        <div className="formContent">
          <div className="formInput">
            <p>Full Name:</p>
            <div className="inputcss">
              <form onSubmit={handleSubmit}>
                <br />
                {user && <div>{user.name}</div>}
                {console.log(user)}
              </form>
            </div>
          </div>
          <br />
          <div className="formInput">
            <p>Email Id:</p>
            <div className="inputcss">
              <form onSubmit={handleSubmit}>
                <br />
                {user && <div>{user.email}</div>}
              </form>
            </div>
          </div>
          <br />
          <div className="formInput">
            <p>DOB:</p>
            <div className="inputcss">
              <form onSubmit={handleSubmit}>
                <label htmlFor="age"></label>
                <input
                  type="date"
                  id="age"
                  name="age"
                  className="inputcss6"
                  value={age}
                  onChange={handleInputChange4}
                  disabled={submitted && !editing}
                />
              </form>
            </div>
          </div>
          <br />
          <br />
          <div className="formInput">
            <p className="formInput">Gender:</p>
            <div className="inputcss">
              <form onSubmit={handleSubmit}>
                <label htmlFor="gender"></label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={handleInputChange5}
                  className="formInput5"
                  disabled={submitted}
                >
                  <option>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </form>
            </div>
          </div>
          <br />
          <br />
          <div className="formInput">
            <p>Address:</p>
            <div className="inputcss"></div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={address}
                onChange={handleInputChange3}
                disabled={submitted && !editing}
                placeholder="address"
              />
            </form>
          </div>
          <br />
          <div className="submitButton">
            <button
              className="button"
              type="submit"
              onClick={handleSubmit}
              disabled={submitted}
            >
              Submit
            </button>

            {submitted && (
              <button onClick={handleEdit} className="button">
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
