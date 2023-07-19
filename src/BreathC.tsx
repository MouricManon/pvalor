import { useEffect, useState } from 'react'
import moment from 'moment';
import "./breath.css"
import breathimage from "./public/assets/breath.png"
import pollutants from "./public/assets/pollutants.jpg"
import {Breath} from "./public/types";

type BreathProps = {
    data: Breath

    date: string
}


function BreathC({ date,data }: BreathProps) {
        function formatLastSyncTime(lastSyncTime: string) {
            const date = new Date(lastSyncTime);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
          }
      
   return (<div id="breath"><div id="titrebreath"><img id="breathimage" alt="breath" src={breathimage}/><h1>Breath</h1></div>
 
  <ul>{data.BreathingRateEntry.length == 0 ?
            <li id="nobr">No data found about BR</li> :
            <> {data.BreathingRateEntry.map((i, index) => (
                <li id="onebr" key={index}> Breathing rate : Date & Time : formatLastSyncTime({i.dateTime}) <li>Breating rate : {i.value.breathingRate}</li></li>))}</>}
        </ul>
        <ul>{data.CardioScoreEntry.length == 0 ?
            <li id="novo2">No data found about vo2</li> :
            <> {data.CardioScoreEntry.map((i, index) => (
                <li key={index} id="onevo2"> VO2 : Date & Time: formatLastSyncTime({i.dateTime})<li>Vo2 max : {i.value.vo2Max} </li> </li>))}</>}</ul>
        <ul className="notdone"> <li>//Take of SABA </li><li>Quantity : </li>
        <li>//Time : </li> </ul>
        <ul className="notdone"><li>//Respiratory volume</li><li>Flow</li></ul>
<ul className="notdone"><li>//Pollutants</li> <img id="pollutantsimage" alt="pollutants" src={pollutants}/></ul>    
</div>)
}
export default BreathC;