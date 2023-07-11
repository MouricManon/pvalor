import React from 'react';
import logo from './logo.svg';
import './App.css';
import Requests from './Requests'
import Profile from './Profile'
import { useEffect, useState } from 'react'

function App() {
  const[token,setToken]=useState("eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1I3NzYiLCJzdWIiOiJCTUJDUVYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJsb2MgcnJlcyByd2VpIHJociBydGVtIiwiZXhwIjoxNjg5MTMxNTM4LCJpYXQiOjE2ODkxMDI3Mzh9._5xeYJqdz0mc1kz67M4nwyzMVtWb7j07m6aQvqau7ao")
  const[id,setid]=useState("-")
  return (
    <div className="App">
<Profile token={token} id={id}></Profile>
      <Requests token={token} id={id}></Requests>
    </div>
  );
}

export default App;
