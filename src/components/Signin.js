import axios from "axios";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";

const Signin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  
  useEffect(() => {
    if(sessionStorage.getItem("user")){
      let user = JSON.parse(sessionStorage.getItem("user"));
      if (user.name !== ""){
        window.location.href = "/info";
      } 
    }
  })

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "VN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = "+84" + phone;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS not sent");
      });
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user.uid);
        axios.get(`http://localhost:8000/user/${user.uid}`).then((response) => {
          console.log(response.data.data);
          if (response.data.data === "not found") {
            sessionStorage.setItem("user", JSON.stringify({id: user.uid, name: "", phone: phone}));
            window.location.href = "/signup"
          }
          else{
            sessionStorage.setItem("user", JSON.stringify(response.data.data))
            window.location.href = "/info"
          }
        });
        // alert("User is verified");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        alert(error.message);
        console.log(error);
        // ...
      });
  };

  return (
    <div>
      <h1>OTP DEMO</h1>
      <h2>Login Form</h2>
      <form onSubmit={onSignInSubmit}>
        <div id="sign-in-button"></div>
        <input
          type="number"
          name="phone"
          placeholder="Mobile number"
          required
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <button type="submit">Send OTP</button>
      </form>

      <h2>Enter OTP</h2>
      <form onSubmit={onSubmitOTP}>
        <input
          type="number"
          name="otp"
          placeholder="OTP Number"
          required
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Signin;
