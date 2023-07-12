import React from 'react';

import './App.css';
import Requests from './Requests'
import Profile from './Profile'
import { useEffect, useState } from 'react'
function App() {
  const[token,setToken]=useState("eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1I3NzYiLCJzdWIiOiJCTUJDUVYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJsb2MgcnJlcyByd2VpIHJociBydGVtIiwiZXhwIjoxNjg5MjI2MzMwLCJpYXQiOjE2ODkxOTc1MzB9.L8MXF0hPyBIWwc_EVkfPso-YZ__u2ubAI8ZZH_dt8cE")
  const[id,setid]=useState("-")
  return (
    <div className="App">
<Profile token={token} id={id}></Profile>
   <Requests token={token} id={id}></Requests>
    </div>
  );
}

export default App;
