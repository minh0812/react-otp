import React, { useState, useEffect } from "react";
import Button from "mui-button";

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
    <div style={{marginTop:'300px'}}>
      <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>Hello {user.name} </h1>
       <Button variant="outlined" type="submit" style={{ display:'flex', margin:'0px auto', color: 'white' }} onClick={signOut}> Sign Out</Button>
      {/* <button onClick={signOut}>Sign Out</button> */}
    </div>
  );
};

export default Info;
