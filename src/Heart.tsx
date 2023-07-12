import { useEffect, useState } from 'react'
import moment from 'moment';
import { getEnabledCategories } from 'trace_events';
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
        gethrv(),[date]
    })

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
    
            if(data==undefined||data==null){
            }
            else{
       for(let item of data){
        rhr.push(item.activities-heart.restingHeartRate)
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
            if(data==undefined||data==null){
            }
            else{
       for(let item of data){
        startTime.push(item.sleep.duration)
        avghr.push(item.sleep.efficiency)
        classification.push(item.sleep.minutesAsleep)
        frequency.push(item.sleep.minutesAwake)
        scalingfactor.push(item.summary.stages.deep)
        nbwave.push(item.summary.stages.light)
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
            if(data==undefined||data==null){
            }
            else{
       for(let item of data){
        dailyRmssd.push(item.hrv.value.dailyRmssd)
        deepRmssd.push(item.hrv.value.deepRmssd)
        dateTime.push(item.hrv.dateTime)
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
            if(data==undefined||data==null){
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
    });}
    function hrdisplay(rhr: any[] | undefined){
        if(rhr==undefined||rhr==null){
            sethr(["No datas about heart rate on this day"])
        }
        else{
             for(let i=0;i<rhr.length;i++){
        sethr(hr => [...hr, [rhr[i]]])  }  
        return(hr)
     
        }
        }
    function ecgdisplay(startTime: any[] | undefined,avghr: any[] | undefined,classification: any[] | undefined,frequency: any[] | undefined,scalingfactor: any[] | undefined,nbwave: any[] | undefined){
        if(startTime==undefined || startTime==null ||avghr==undefined|| avghr==null ||classification==undefined|| classification==null|| frequency==undefined || frequency==null||scalingfactor==undefined || scalingfactor==null||nbwave==undefined||nbwave==null ){
            setecg(["No datas about ecg"])
        }
        else{
             for(let i=0;i<startTime.length;i++){
        setecg(ecg => [...ecg, [startTime[i],avghr[i],classification[i], frequency[i],scalingfactor[i],nbwave[i]]])  }  
        return(ecg)
     
        }
        }
        function hrvdisplay(dailyRmssd: any[] | undefined,deepRmssd:any[] | undefined, dateTime:any[] | undefined){
            if(dailyRmssd==undefined||dailyRmssd==null||deepRmssd==undefined||deepRmssd==null||dateTime==undefined||dateTime==null){
                sethrv(["No datas about HRV on this day"])
            }
            else{
                 for(let i=0;i<dailyRmssd.length;i++){
            sethrv(hrv => [...hrv, [dailyRmssd[i], deepRmssd[i], dateTime[i]]])  }  
            return(hrv)
         
            }
            }
            function spo2display(dateTime: any[] | undefined, avg:any[] | undefined, min:any[] | undefined, max:any[] | undefined){
                if(dateTime==undefined||dateTime==null||avg==undefined||avg==null||min==undefined||min==null||max==undefined||max==null){
                    setspo2(["No datas about spo2 on this day"])
                }
                else{
                     for(let i=0;i<dateTime.length;i++){
                        setspo2(spo2 => [...spo2, [dateTime[i], avg[i], min[i]]])  }  
                return(spo2)
             
                }
                }
   return (<div><input 
    type="date" 
    value={datebeginning} 
    onChange={(event) => setDatebegin(event.target.value)} 
  /> 
    <ul>{hr.map((i)=>(<li>Resting heart rate : {i[0]} </li>))}</ul>
    <ul>{ecg.map((i)=>(<li>ECG : Start time : {i[0]} , Average Heart rate : {i[1]} , Classification : {i[2]} , Frequency : {i[3]} , Scaling factor : {i[4]} , Number of waves :{i[5]}</li>))}</ul>
    <ul>{hrv.map((i)=>(<li>HRV : Date time : {i[2]} , Value of Hrv for daily Rmssd  :{i[0]}, Value of Hrv for deep Rmssd  : {i[1]} </li>))}</ul>
    <ul>{spo2.map((i)=>(<li>Spo2 : Date time : {i[0]} , Maximum: {i[3]}, Minimum :{i[2]} , Average :{i[1]}   </li>))}</ul>
</div>)
}
export default Heart;