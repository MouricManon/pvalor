import { useEffect, useState } from 'react'
type SleepProps = {
  date : string
  token : string
  id : string
}


function Sleep({ date, token, id }: SleepProps) {
    
    const [sleep, setsleep] = useState<any[]>([]);
    useEffect(()=>{ getsleep()
        ,[date]}
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
            if(data==undefined||data==null){
            }
            else{
       for(let item of data){
        duration.push(item.sleep.duration)
        efficiency.push(item.sleep.efficiency)
        minutesAsleep.push(item.sleep.minutesAsleep)
        minutesAwake.push(item.sleep.minutesAwake)
        deepsleep.push(item.summary.stages.deep)
        lightsleep.push(item.summary.stages.light)
        remsleep.push(item.summary.rem)
        waketime.push(item.summary.wake)
        timeinbed.push(item.totalTimeInBed)
        console.log(data)
       }}
         sleepdisplay(duration,efficiency,minutesAsleep,minutesAwake,deepsleep,lightsleep,remsleep,waketime,timeinbed)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    })}
function sleepdisplay(duration: any[] | undefined, efficiency:any[] | undefined, minutesAsleep:any[] | undefined, minutesAwake:any[] | undefined, deepsleep:any[] | undefined, lightsleep:any[] | undefined, remsleep:any[] | undefined, waketime:any[] | undefined, timeinbed:any[] | undefined){
    if(duration==undefined||duration==null||efficiency==undefined||efficiency==null||minutesAsleep==undefined||minutesAsleep==null||minutesAwake==undefined||minutesAwake==null||deepsleep==undefined||deepsleep==null||lightsleep==undefined||lightsleep==null||remsleep==undefined||remsleep==null||waketime==undefined||waketime==null||timeinbed==undefined||timeinbed==null){
        setsleep(["No datas about sleeping on this day"])
    }
    else{
         for(let i=0;i<duration.length;i++){
    setsleep(sleep => [...sleep, [duration[i], efficiency[i], minutesAsleep[i], minutesAwake[i], deepsleep[i], lightsleep[i], remsleep[i], waketime[i], timeinbed[i]]])  }  
    return(sleep)
 
    }
    }
    
    return (<div>
   <ul>{sleep.map((i)=>(<li>Duration : {i[0]} , Efficiency : {i[1]}%, Minutes Asleep : {i[2]}, Minutes Awake : {i[3]}, Stages :  Deep sleep : {i[3]}, Light sleep : {i[4]}, Rem sleep : {i[5]}, Wake time : {i[6]} </li>))}</ul>
</div>)
}
export default Sleep;