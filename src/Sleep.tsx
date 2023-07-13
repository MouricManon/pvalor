import { useEffect, useState } from 'react'
import Sleepimage from "./public/assets/sleepicon.png"
import "./sleep.css"
type SleepProps = {
  date : string
  token : string
  id : string
}


function Sleep({ date, token, id }: SleepProps) {
    
    const [sleep, setsleep] = useState<any[]>([]);
    useEffect(()=>{ getsleep()
        },[date]
)

async function getsleep(){

// get sleep log by date range
let urlsleepbydater = "https://api.fitbit.com/1.2/user/" + id + "/sleep/date/" + date + ".json";
fetch(urlsleepbydater, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        let duration: any[] = []
        let efficiency: any[] = []
        let minutesAsleep: any[] = []
        let minutesAwake: any[] = []
        let deepsleep: any[] = []
        let lightsleep: any[] = []
        let remsleep: any[] = []
        let waketime: any[] = []
        let timeinbed: any[] = []
            if(data.sleep.length==0){
            }
            else{
       for(let item of data.sleep){
        duration.push(item.duration)
        efficiency.push(item.efficiency)
        minutesAsleep.push(item.minutesAsleep)
        minutesAwake.push(item.minutesAwake)}
        deepsleep.push(data.summary.stages?.deep)
        lightsleep.push(data.summary.stages?.light)
        remsleep.push(data.summary?.rem)}
         sleepdisplay(duration,efficiency,minutesAsleep,minutesAwake,deepsleep,lightsleep,remsleep)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    })}
function sleepdisplay(duration: any[], efficiency:any[], minutesAsleep:any[], minutesAwake:any[], deepsleep:any[], lightsleep:any[], remsleep:any[]){
    setsleep([])
    if(duration.length==0){
    }
    else{
         for(let i=0;i<duration.length;i++){
    setsleep(sleep => [...sleep, [duration[i], efficiency[i], minutesAsleep[i], minutesAwake[i], deepsleep[i], lightsleep[i], remsleep[i]]])  }  
    return(sleep)
 
    }
    }
    
    return (<div id="sleeps">
         <div id="titresleep" ><img id="imagesleep" alt="Sleep icon" src={Sleepimage}/> <h1>SLEEP</h1></div>
         <ul >{sleep.length == 0?
            <li id="nosleep">No sleep's data found</li> :
            <> {sleep.map((i, index) => (
                <li key={index} id="onesleep"> Date : {date} <ul><li> Duration : {i[0]/60*0.001} </li><li> Efficiency : {i[1]}% </li><li> Minutes Asleep : {i[2]}</li><li> Minutes Awake : {i[3]}</li><ul><li> Stages :  </li><li>Deep sleep : {i[4]}</li><li> Light sleep : {i[5]}</li> <li>Rem sleep : {i[6]}</li></ul></ul></li>))}</>}
        </ul>
</div>)
}
export default Sleep;