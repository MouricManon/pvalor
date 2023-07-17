import React from 'react';

import './App.css';
import Requests from './Requests'
import Profile from './Profile'
import { useEffect, useState } from 'react'
type AppProps = {
  token : string
  refreshtoken : string
}

function App({  token, refreshtoken }: AppProps) {
  const[id,setid]=useState("-")
  return (
    <div className="App">
<Profile token={token} id={id}></Profile>

   <Requests token={token} id={id}></Requests>
    </div>
  );
}

export default App;
