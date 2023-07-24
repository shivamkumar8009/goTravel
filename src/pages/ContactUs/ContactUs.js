import React, { useState } from "react";
import "./styles.css";
import Footer from "../../components/Footer";

// Importing required dependencies and components

const ContactUs = () => {
  // Initializing state for user data
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  let name, value; // Variables for storing input name and value

  // Function to update the user data state
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };

  // Function to submit user data
  const submitData = async (event) => {
    event.preventDefault();
    const { fullName, email, message } = userData;

    // Check if all required fields are filled
    if (fullName && email && message) {
      // Send a POST request to save the data
      const res = await fetch(
        "https://gotravel-ac2fd-default-rtdb.firebaseio.com/userDataRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            message,
          }),
        }
      );

      if (res) {
        // Reset the user data state and show a success message
        setUserData({
          fullName: "",
          email: "",
          message: "",
        });
        alert("Data saved successfully");
      } else {
        alert("Please fill the Data");
        // If the response is not successful, display an alert asking to fill the data
      }
    } else {
      // If any of the fields are empty, display an alert asking to fill the data
      alert("Please fill the Data");
    }
  };

  return (
    <>
      {/* Contact Us section */}
      <div className="bb">
        <header className="head1">
          <h1>Contact Us</h1>
        </header>
        <div className="container3">
          <div className="contact-form3">
            <form method="POST">
              <label htmlFor="name">Full Name:</label>
              {/* Input field for full name */}
              <input
                type="text"
                id="name"
                value={userData.fullName}
                onChange={postUserData}
                name="fullName"
                required
              />
              <label htmlFor="email">Email:</label>
              {/* Input field for email */}
              <input
                type="email"
                id="email"
                value={userData.email}
                onChange={postUserData}
                name="email"
                required
              />
              <label htmlFor="message">Message:</label>
              {/* Input field for message */}
              <input
                type="text"
                id="message"
                value={userData.message}
                onChange={postUserData}
                name="message"
                required
              />
              {/* Submit button */}
              <button type="submit" onClick={submitData}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Separator */}
      <br />
      <hr className="hr-tag" />
      <br />

      {/* Footer */}
      <Footer />
      <br />
    </>
  );
};

export default ContactUs;
