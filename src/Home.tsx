import React from 'react';

import './App.css';
import Requests from './Display'
import Profile from './Profile'
import GeneratePkce from './GeneratePkce'

import { useEffect, useState } from 'react'
function Home() {

  return (
    
    <div >
        <h3>Welcome ! </h3>
<GeneratePkce/>

    </div>
  );
}

export default Home;
