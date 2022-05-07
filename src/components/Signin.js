import axios from "axios";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import "./style.css";
import Button from "mui-button";
import { BiPaperPlane } from 'react-icons/bi';
import { FiLogIn } from 'react-icons/fi';

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
      <div className="login-box">
        <h2 style={{fontSize:'40px'}}>OTP DEMO</h2>
        <h2 style={{fontFamily:"Rokkitt, serif", fontSize:'30px'}}>Login Form</h2>
        <form style={{display:'flex'}} onSubmit={onSignInSubmit}>
          <div className="user-box">
          <div id="sign-in-button"></div>
            <input
              type="text"
              name="phone"
              // placeholder="Mobile number"
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <label>Mobile Number</label>
          </div>
          {/* <a href="#" onClick={{}}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Send OTP
          </a> */}
          <div className="frame">
            {/* <button className="custom-btn btn-16" type="submit">Send OTP</button> */}
            <Button variant="outlined" type="submit">Send OTP&nbsp;<BiPaperPlane/></Button>
          </div>
        
        </form>

        <h2 style={{fontFamily:"Rokkitt, serif", fontSize:'30px'}}>Enter OTP</h2>
        <form style={{display:'flex', alignItems: 'center'}} onSubmit={onSubmitOTP}>
          <div className="user-box">
            <input
              type="text"
              name="otp"
              // placeholder="OTP Number"
              required
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <label>OTP Number</label>
          </div>
          <div className="frame" style={{marginRight:'10px'}}>
            <Button variant="outlined" type="submit">Sign In&nbsp;<FiLogIn/></Button>
          </div>
        </form>
      </div>
      <div className="infoMembers grid-container" style={{marginTop:'30px'}}>
        <div className="i_member">
          {/* <img src={avatarImage1} alt="" height="100px" width="100px" style={{ border: "1px solid transparent", borderRadius: "50%" }} /> */}
          <h3>PHAM DUY MINH</h3>
          <h3>45.01.104.145</h3>
        </div>

        <div className="i_member">
          <h3>NGUYEN NGOC PHUONG QUYNH</h3>
          <h3>45.01.104.195</h3>
        </div>

        <div className="i_member">
          {/* <img src={avatarImage1} alt="" height="100px" width="100px" style={{ border: "1px solid transparent", borderRadius: "50%" }} /> */}
          <h3>VO THI PHUONG THAM</h3>
          <h3>45.01.104.218</h3>
        </div>

        <div className="i_member">
          {/* <img src={avatarImage1} alt="" height="100px" width="100px" style={{ border: "1px solid transparent", borderRadius: "50%" }} /> */}
          <h3>HUYNH THI THANH NGAN</h3>
          <h3>45.01.104.151</h3>
        </div>

        <div className="i_member">
          {/* <img src={avatarImage1} alt="" height="100px" width="100px" style={{ border: "1px solid transparent", borderRadius: "50%" }} /> */}
          <h3>TRINH THI PHUONG VI</h3>
          <h3>45.01.104.276</h3>
        </div>
        
        <div className="i_member">
          {/* <img src={avatarImage1} alt="" height="100px" width="100px" style={{ border: "1px solid transparent", borderRadius: "50%" }} /> */}
          <h3>TRAN THI TU LINH</h3>
          <h3>45.01.104.127</h3>
        </div>
      </div>
    </div>
  );
};

export default Signin;
