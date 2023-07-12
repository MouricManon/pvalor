import React from 'react';

import './App.css';
import Requests from './Requests'
import Profile from './Profile'
import { useEffect, useState } from 'react'
function App() {
  const[token,setToken]=useState("eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1I3NzYiLCJzdWIiOiJCTUJDUVYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByd2VpIHJociBydGVtIiwiZXhwIjoxNjg5MjAzNzgxLCJpYXQiOjE2ODkxNzQ5ODF9.P7ymVBFk6Qa3qqSqQrTmvhm6dBQDpGVrdBOi9_0Eewc")
  const[id,setid]=useState("-")
  return (
    <div className="App">
<Profile token={token} id={id}></Profile>
   <Requests token={token} id={id}></Requests>
    </div>
  );
}

export default App;
