import { useEffect, useState } from 'react'
import moment from 'moment';
import { getEnabledCategories } from 'trace_events';
import heartimage from "./public/assets/heart.png"
import "./heart.css"
import {Heart} from "./public/types";

type HeartProps = {
    data: Heart

    date: string
}


function HeartC({ date, data}: HeartProps) {

    
   return (<div id="heart"><div id="titreheart"><img id="heartimage" alt="heart" src={heartimage}/><h1>Heart</h1></div>
  <ul>{data.hearRateZones.length == 0 ?
            <li id="nohr">No HR found</li> :
            <> {data.hearRateZones.map((i, index) => (
                <li id="onehr" key={index}>Resting heart rate : {i.restingHeartRate}</li>))}</>}
        </ul>
    <ul>{data.ecg.length == 0 ?
            <li id="noecg">No ecg found</li> :
            <> {data.ecg.map((i, index) => (
                <li id="oneecg" key={index}>ECG : Start time : {i.startTime} , Average Heart rate : {i.averageHeartRate} , Classification : {i.resultClassification} , Frequency : {i.samplingFrequencyHz} , Scaling factor : {i.scalingFactor} , Number of waves :{i.numberOfWaveformSamples}</li>))}</>}
    </ul>
    <ul>{data.hrv.length == 0 ? 
            <li id="nohrv">No HRV found</li> :
            <> {data.hrv.map((i, index) => (
                <li id="onehrv" key={index}>HRV : Date time : {i.dateTime} , Value of Hrv for daily Rmssd  :{i.value.dailyRmssd}, Value of Hrv for deep Rmssd  : {i.value.deepRmssd} </li>))}</>}</ul>
   <ul>{data.spo2.value == undefined?
            <li id="nospo2">No spo2 found</li> :
            <>
                <li id="onespo2" >Spo2 : Date time : {data.spo2.dateTime} , Average : {data.spo2.value.avg} , Minimum : {data.spo2.value.min} , Maximum : {data.spo2.value.max} </li></>}
               <div className="notdone"> <li > Blood pressure : Systolic Blood pressure </li>
                <li>Diastolic Blood pressure</li></div></ul>
                
</div>)
}
export default HeartC;