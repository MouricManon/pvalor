import { useEffect, useState } from 'react'
import Sleepimage from "./public/assets/sleepicon.jpg"
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
        remsleep.push(data.summary?.rem)
        waketime.push(data.summary?.wake)
        timeinbed.push(data.summary.totalTimeInBed)}
        console.log(data)
         sleepdisplay(duration,efficiency,minutesAsleep,minutesAwake,deepsleep,lightsleep,remsleep,waketime,timeinbed)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    })}
function sleepdisplay(duration: any[], efficiency:any[], minutesAsleep:any[], minutesAwake:any[], deepsleep:any[], lightsleep:any[], remsleep:any[] , waketime:any[] , timeinbed:any[] ){
    setsleep([])
    if(duration.length==0){
    }
    else{
         for(let i=0;i<duration.length;i++){
    setsleep(sleep => [...sleep, [duration[i], efficiency[i], minutesAsleep[i], minutesAwake[i], deepsleep[i], lightsleep[i], remsleep[i], waketime[i], timeinbed[i]]])  }  
    return(sleep)
 
    }
    }
    
    return (<div>
         <div ><img id="imagesleep" alt="Sleep icon" src={Sleepimage}/> <h1>SLEEP</h1></div>
         <ul id="sleeps">{sleep.length == 0?
            <li id="nosleep">No sleep's data found</li> :
            <> {sleep.map((i, index) => (
                <li key={index} id="onesleep">  Duration : {i[0]} , Efficiency : {i[1]}%, Minutes Asleep : {i[2]}, Minutes Awake : {i[3]}, Stages :  Deep sleep : {i[3]}, Light sleep : {i[4]}, Rem sleep : {i[5]}, Wake time : {i[6]}</li>))}</>}
        </ul>
</div>)
}
export default Sleep;