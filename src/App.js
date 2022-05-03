import React, { useState } from 'react'
import firebase from './firebase'


const App = () => {

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("")

  const configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "VN"
    });
  }

  const onSignInSubmit = (e) => {
    e.preventDefault()
    configureCaptcha()
    const phoneNumber = "+84" + phone
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });
  }

  const onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user)
      alert("User is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      alert(error.message)
      console.log(error)
      // ...
    });
  }

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={onSignInSubmit}>
        <div id="sign-in-button"></div>
        <input type="number" name="phone" placeholder="Mobile number" required onChange={(e) => {setPhone(e.target.value)}} />
        <button type="submit">Submit</button>
      </form>

      <h2>Enter OTP</h2>
      <form onSubmit={onSubmitOTP}>
        <input type="number" name="otp" placeholder="OTP Number" required onChange={(e) => {setOtp(e.target.value)}}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
