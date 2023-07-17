import { useEffect, useState } from 'react'
import moment from 'moment';
import { getEnabledCategories } from 'trace_events';
import heartimage from "./public/assets/heart.png"
import "./heart.css"

type HeartProps = {
  date : string
  token : string
  id : string
}


function Heart({ date, token, id }: HeartProps) {
    const [hr, sethr] = useState<any[]>([]); 
    const [spo2, setspo2] = useState<any[]>([]); 
    const [ecg, setecg] =  useState<any[]>([]); 
    const [hrv, sethrv] = useState<any[]>([]); 
    const [datebeginning, setDatebegin] =   useState(moment().format('YYYY-MM-DD')); 
    useEffect(()=>{ gethr()
        getspo2()
        getecg()
        gethrv()
    },[date])

async function gethr(){



//get heart rate time series by date 
let urlhrt = "https://api.fitbit.com/1/user/" + id + "/activities/heart/date/" + date + "/7d.json ";

fetch(urlhrt, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        let rhr: any[] = []
    
            if(data['activities-heart']==undefined||data['activities-heart']==null||data['activities-heart'].restingHeart){
            }
            else{
       for(let item of data['activities-heart']){
        rhr.push(item.restingHeartRate)
        console.log(data)
       }}
         hrdisplay(rhr)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
    
}
async function getecg(){
    let urlecg = "https://api.fitbit.com/1/user/" + id + "/ecg/list.json?beforeDate=" + date + "&sort=asc&limit=1&offset=0 ";

fetch(urlecg, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        let startTime: any[] = []
        let avghr: any[] = []
        let classification: any[] = []
        let frequency: any[] = []
        let scalingfactor: any[] = []
        let nbwave: any[] = []
            if(data.ecgReadings==undefined||data.ecgReadings==null){
            }
            else{
       for(let item of data.ecgReadings){
        startTime.push(item.startTime)
        avghr.push(item.averageHeartRate)
        classification.push(item.resultClassification)
        frequency.push(item.samplingFrequencyHz)
        scalingfactor.push(item.scalingFactor)
        nbwave.push(item.numberOfWaveformSamples)
        console.log(data)
       }}
         ecgdisplay(startTime,avghr,classification,frequency,scalingfactor,nbwave)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
}

async function gethrv(){
    
// get hrv
let urlhrv = "https://api.fitbit.com/1/user/" + id + "/hrv/date/"+datebeginning+"/" + date + ".json ";
fetch(urlhrv, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        let dailyRmssd: any[] = []
        let deepRmssd: any[] = []
        let dateTime: any[] = []
            if(data.hrv==undefined||data.hrv==null){
            }
            else{
       for(let item of data.hrv){
        dailyRmssd.push(item.value.dailyRmssd)
        deepRmssd.push(item.value.deepRmssd)
        dateTime.push(item.dateTime)
        console.log(data)
       }}
         hrvdisplay(dailyRmssd,deepRmssd,dateTime)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
}
async function getspo2(){
    // get spo2 

let urlspo = "https://api.fitbit.com/1/user/" + id + "/spo2/date/" + date + ".json ";

fetch(urlspo, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        let dateTime: any[] = []
        let avg: any[] = []
        let min: any[] = []
        let max: any[] = []
            if (Object.keys(data).length === 0) {
            }
            else{
       for(let item of data){
        dateTime.push(item.dateTime)
        avg.push(item.value.avg)
        min.push(item.value.min)
        max.push(item.value.max)
        console.log(data)
       }}
         spo2display(dateTime,avg,min,max)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });}function hrdisplay(rhr: any[]) {
        //On vide le tableau pour éviter les doublons
        sethr([])
        //Il se trouve que même si on a pas de données, le tableau est quand même rempli
        let drapeau: boolean = false
        if (rhr != undefined) {
            for (let i = 0; i < rhr.length; i++) {
                //Pour éviter d'avoir des lignes vides
                if (rhr[i] == undefined) {
                    drapeau = true
                }
            }
            if (drapeau) {
            } else {
                for (let i = 0; i < rhr.length; i++) {
                    //Pour éviter d'avoir des lignes vides
                    if (rhr[i] == undefined) {
                    } else {
                        sethr(hr => [...hr, [rhr[i]]])
                    }
                }
            }
        }
    }
    function ecgdisplay(startTime: any[],avghr: any[],classification: any[],frequency: any[],scalingfactor: any[],nbwave: any[]){
        setecg([])
        if(startTime.length==0 ){
        }
        else{
             for(let i=0;i<startTime.length;i++){
        setecg(ecg => [...ecg, [startTime[i],avghr[i],classification[i], frequency[i],scalingfactor[i],nbwave[i]]])  }  
        return(ecg)
     
        }
        }
        function hrvdisplay(dailyRmssd: any[],deepRmssd:any[], dateTime:any[]){
            sethrv([])
            if(dailyRmssd.length==0){
            }
            else{
                 for(let i=0;i<dailyRmssd.length;i++){
            sethrv(hrv => [...hrv, [dailyRmssd[i], deepRmssd[i], dateTime[i]]])  }  
            return(hrv)
         
            }
            }
            function spo2display(dateTime: any[], avg:any[], min:any[], max:any[]){
                setspo2([])
                if(dateTime.length==0){
                }
                else{
                     for(let i=0;i<dateTime.length;i++){
                        setspo2(spo2 => [...spo2, [dateTime[i], avg[i], min[i]]])  }  
                return(spo2)
             
                }
                }
   return (<div id="heart"><div id="titreheart"><img id="heartimage" alt="heart" src={heartimage}/><h1>Heart</h1></div>
   <div className="datebegin"><h2>Choose the beginning date</h2><input 
    type="date" 
    value={datebeginning} 
    onChange={(event) => setDatebegin(event.target.value)} 
  /> </div>
  <ul>{hr.length == 0 ?
            <li id="nohr">No HR found</li> :
            <> {hr.map((i, index) => (
                <li id="onehr" key={index}>Resting heart rate : {i[0]}</li>))}</>}
        </ul>
    <ul>{ecg.length == 0 ?
            <li id="noecg">No ecg found</li> :
            <> {ecg.map((i, index) => (
                <li id="oneecg" key={index}>ECG : Start time : {i[0]} , Average Heart rate : {i[1]} , Classification : {i[2]} , Frequency : {i[3]} , Scaling factor : {i[4]} , Number of waves :{i[5]}</li>))}</>}
    </ul>
    <ul>{hrv.length == 0 ? 
            <li id="nohrv">No HRV found</li> :
            <> {hrv.map((i, index) => (
                <li id="onehrv" key={index}>HRV : Date time : {i[2]} , Value of Hrv for daily Rmssd  :{i[0]}, Value of Hrv for deep Rmssd  : {i[1]} </li>))}</>}</ul>
   <ul>{spo2.length == 0 ?
            <li id="nospo2">No spo2 found</li> :
            <> {spo2.map((i, index) => (
                <li id="onespo2" key={index}>Spo2 : Date time : {i[0]} , Average : {i[1]} , Minimum : {i[2]} , Maximum : {i[3]} </li>))}</>}
               <div className="notdone"> <li > Blood pressure : Systolic Blood pressure </li>
                <li>Diastolic Blood pressure</li></div></ul>
                
</div>)
}
export default Heart;