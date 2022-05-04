import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Info from './components/Info';
import Signin from './components/Signin';
import Signup from './components/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signin/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/info" element={<Info/>}/>
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </Router>
  );
}

export default App
