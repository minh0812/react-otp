import React, { useState, useEffect } from "react";

const Info = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      let user_tmp = sessionStorage.getItem("user");
      setUser(JSON.parse(user_tmp));
    } else {
      window.location.href = "/";
    }
  }, []);

  const signOut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <div>
      <h1>Hello {user.name} </h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Info;
