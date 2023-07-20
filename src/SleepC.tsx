import { useEffect, useState } from 'react'
import Sleepimage from "./public/assets/sleepicon.png"
import "./sleep.css"
import {Sleep} from "./public/types";
type SleepProps = {
  data : Sleep[]
date : string
}


function SleepC({ data,date}: SleepProps) {
    
    
    return (<div id="sleeps">
         <div id="titresleep" ><img id="imagesleep" alt="Sleep icon" src={Sleepimage}/> <h1>SLEEP</h1></div>
         <ul >{data.length == 0?
            <li id="nosleep">No sleep's data found</li> :
            <> {data.map((i, index) => (
                <li key={index} id="onesleep"> Date : {date} <ul><li> Duration : {i.duration/60*0.001} </li><li> Efficiency : {i.efficiency}% </li><li> Minutes Asleep : {i.minutesAsleep}</li><li> Minutes Awake : {i.minutesAwake}</li><ul  className='notdonesleep'><li> Stages :  </li><li>Deep sleep :</li><li> Light sleep : </li> <li>Rem sleep : </li></ul></ul></li>))}</>}
        </ul>
</div>)
}
export default SleepC;