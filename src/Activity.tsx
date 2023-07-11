import { useEffect, useState } from 'react'

type ActivityProps = {
    date : string
    token : string
    id : string
  }
  

function Activity({date,token, id }: ActivityProps) {
const[info, setInfo]=useState<any[]>([])
useEffect(()=>{ getActivezone()}
)

async function getActivezone(){
// Get active zone minutes by time

let urlactivezonemin = "https://api.fitbit.com/1/user/" + id + "/activities/active-zone-minutes/date/" + date + "/7d.json ";
fetch(urlactivezonemin, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        // Les données récupérées sont stockées dans la variable 'data'
        let dateTime: any[] = []
        let activeZoneMinutes: any[] = []
            let fatBurnActiveZoneMinutes: any[] = []
            let peakActiveZoneMinutes: any[] = []
       for(let item of data){
        dateTime.push(item.dateTime)
        activeZoneMinutes.push(item.value.activeZoneMinutes)
        fatBurnActiveZoneMinutes.push(item.value.fatBurnActiveZoneMinutes)
        peakActiveZoneMinutes.push(item.value.peakActiveZoneMinutes)
        console.log(data)
       }
      displayactivityzone(dateTime,activeZoneMinutes, fatBurnActiveZoneMinutes, peakActiveZoneMinutes)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
}function displayactivityzone(dateTime: any[] | undefined, activeZoneMinutes: any[] | undefined, fatBurnActiveZoneMinutes: any[] | undefined, peak: any[] | undefined){
    if(dateTime==undefined||dateTime==null||activeZoneMinutes==undefined||activeZoneMinutes==null||fatBurnActiveZoneMinutes==undefined||fatBurnActiveZoneMinutes==null||peak==undefined||peak==null){
        setInfo(["No datas about AZM"])
    }
    else{
         for(let i=0;i<dateTime.length;i++){
    setInfo(info => [...info, [dateTime[i],activeZoneMinutes[i], fatBurnActiveZoneMinutes[i], peak[i]]])  }  
    return(info)
 
    }
    }
 

    return (<div> <ul>{info.map((i)=>(<li>Date : {i[0]} , Active zone minutes: {i[1]} , Fat Burn Active Zone minutes : {i[2]}, Peak Active Zone Minutes : {i[3]} </li>))}</ul>
    </div>)
}
export default Activity;