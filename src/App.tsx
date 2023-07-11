import React from 'react';
import logo from './logo.svg';
import './App.css';
import Requests from './Requests'
import Profile from './Profile'
import { useEffect, useState } from 'react'

function App() {
  const[token,setToken]=useState("eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1I3NzYiLCJzdWIiOiJCTUJDUVYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJudXQgcnBybyByc2xlIHJjZiByYWN0IHJsb2MgcnJlcyByd2VpIHJociBydGVtIiwiZXhwIjoxNjg5MTExMTgwLCJpYXQiOjE2ODkwODIzODB9.4B4FfHsdERez0xgwKx82YBFcKFdKw6CaNtSZOhVXiRE")
  const[id,setid]=useState("-")
  return (
    <div className="App">
<Profile token={token} id={id}></Profile>
      <Requests token={token} id={id}></Requests>
    </div>
  );
}

export default App;
