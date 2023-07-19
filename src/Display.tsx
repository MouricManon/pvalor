import { useEffect, useState } from 'react';
import moment from 'moment';
import BodyC from './BodyC';
import DevicesC from './DevicesC';
import ActivityC from './ActivityC';
import BreathC from './BreathC';
import SleepC from './SleepC';
import HeartC from './HeartC';
import "./requests.css"
import {UserData} from "./public/types";
    
type DisplayProps = {
  data: UserData
date:string
}

  
   
function Display({data,date}: DisplayProps) {
  

    return (
      <div>
   <DevicesC  data={data.connected_devices} date={date} /> 
    <SleepC data={data.date.sleep} date={date}  /> 
    <BreathC  data={data.date.breath} date={date} />
    <HeartC data={data.date.heart} date={date} />
    <BodyC  data={data.date.body} date={date} />
    <ActivityC data={data.date.activity} date={date} />
      </div>
    );
    }


export default Display;
