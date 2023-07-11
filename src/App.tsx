import React from 'react';
import logo from './logo.svg';
import './App.css';
import Requests from './Requests'
import Profile from './Profile'
import { useEffect, useState } from 'react'

function App() {
  const[token,setToken]=useState("eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1I2VEYiLCJzdWIiOiJCTFZXWUIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJudXQgcnBybyByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByd2VpIHJociBydGVtIiwiZXhwIjoxNjg5MTI3MzQ2LCJpYXQiOjE2ODkwOTg1NDZ9.enClV9aumWlBL68qKK7lTNTjaDVe_eDnD52tBVbket8")
  const[id,setid]=useState("-")
  return (
    <div className="App">
<Profile token={token} id={id}></Profile>
      <Requests token={token} id={id}></Requests>
    </div>
  );
}

export default App;
