import { useEffect, useState } from 'react'

type ActivityProps = {
    date : string
    token : string
    id : string
  }
  

function Activity({date,token, id }: ActivityProps) {
const[info, setInfo]=useState<any[]>([])
const[infolist, setInfolist]=useState<any[]>([])
useEffect(()=>{ getActivezone()
     getActivityList() },[date]
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
            if(data==undefined||data==null){
            }
            else{
       for(let item of data){
        dateTime.push(item.dateTime)
        activeZoneMinutes.push(item.value.activeZoneMinutes)
        fatBurnActiveZoneMinutes.push(item.value.fatBurnActiveZoneMinutes)
        peakActiveZoneMinutes.push(item.value.peakActiveZoneMinutes)
        console.log(data)
       }}
      displayactivityzone(dateTime,activeZoneMinutes, fatBurnActiveZoneMinutes, peakActiveZoneMinutes)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
}
async function getActivityList(){
//get activity log list
let urlactivitylist = "https://api.fitbit.com/1/user/" + id + "/activities/list.json?afterDate=" + date + "&sort=asc&offset=0&limit=2 ";

fetch(urlactivitylist, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
    let activeDuration: any[] = []
        let activitylevelmin: any[] = []
        let activitylevelname: any[] = []
        let activityname: any[] = []
        let calories: any[] = []
        let elevationgain: any[] = []
        let steps: any[] = []
        let distance: any[] = []
            if(data==undefined||data==null){
            }
            else{
       for(let item of data){
        activeDuration.push(item.activities.activeDuration)
        activitylevelmin.push(item.activities.activityLevel.minutes)
        activitylevelname.push(item.activities.activityLevel.name)
        calories.push(item.activities.calories)
        elevationgain.push(item.activities.elevationGain)
        steps.push(item.activities.steps)
        distance.push(item.activities.distance)
        activityname.push(item.activities.activityName)
        console.log(data)
       }}
      displayactivitylist(activeDuration,activitylevelmin, activitylevelname, activityname,calories,elevationgain,steps,distance)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    })}

function displayactivityzone(dateTime: any[] | undefined, activeZoneMinutes: any[] | undefined, fatBurnActiveZoneMinutes: any[] | undefined, peak: any[] | undefined){
    if(dateTime==undefined||dateTime==null||activeZoneMinutes==undefined||activeZoneMinutes==null||fatBurnActiveZoneMinutes==undefined||fatBurnActiveZoneMinutes==null||peak==undefined||peak==null){
        setInfo(["No datas about AZM"])
    }
    else{
         for(let i=0;i<dateTime.length;i++){
    setInfo(info => [...info, [dateTime[i],activeZoneMinutes[i], fatBurnActiveZoneMinutes[i], peak[i]]])  }  
    return(info)
 
    }
    }
 
    function displayactivitylist(activeDuration: any[] | undefined, activitylevelmin: any[] | undefined, activitylevelname: any[] | undefined, activityname: any[] | undefined,calories: any[] | undefined,elevationgain: any[] | undefined,steps: any[] | undefined,distance: any[] | undefined){
        if(activeDuration==undefined||activeDuration==null||activitylevelmin==undefined||activitylevelmin==null||activitylevelname==undefined||activitylevelname==null||activityname==undefined||activityname==null||calories==undefined||calories==null||elevationgain==undefined||elevationgain==null||steps==undefined||steps==null||distance==undefined||distance==null){
            setInfolist(["No datas about Activities"])
        }
        else{
             for(let i=0;i<activeDuration.length;i++){
        setInfolist(infolist => [...infolist, [activeDuration[i],activitylevelmin[i], activitylevelname[i], activityname[i],calories[i],elevationgain[i],steps[i],distance[i]]])  }  
        return(infolist)
     
        }
        }
     

    return (<div> <ul>{info.map((i)=>(<li>Date : {i[0]} , Active zone minutes: {i[1]} , Fat Burn Active Zone minutes : {i[2]}, Peak Active Zone Minutes : {i[3]} </li>))}</ul>
    <ul>{infolist.map((i)=>(<li>Date : {date}, Activity duration : {i[0]} , Activity name : {i[3]}, Activity level name: {i[2]} , Activity level duration : {i[1]}, Calories burned {i[4]},Elevation gain {i[4]}, Steps : {i[5]}, Distance : {i[6]} </li>))}</ul></div>)
}
export default Activity;