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
            if(data==undefined||data==null||data.value==undefined||data.value==null){
            }
            else{
       for(let item of data){
        dateTime.push(item.dateTime)}
        for(let item of data.value){
        activeZoneMinutes.push(item.activeZoneMinutes)
        fatBurnActiveZoneMinutes.push(item.fatBurnActiveZoneMinutes)
        peakActiveZoneMinutes.push(item.peakActiveZoneMinutes)}
        console.log(data)
       }
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
            if(data.activities==undefined||data.activities==null){
            }
            else{
       for(let item of data.activities){
        activeDuration.push(item.activeDuration)
        activitylevelmin.push(item.activityLevel.minutes)
        activitylevelname.push(item.activityLevel.name)
        calories.push(item.calories)
        elevationgain.push(item.elevationGain)
        steps.push(item.steps)
        distance.push(item.distance)
        activityname.push(item.activityName)
        console.log(data)
       }}
      displayactivitylist(activeDuration,activitylevelmin, activitylevelname, activityname,calories,elevationgain,steps,distance)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    })}

function displayactivityzone(dateTime: any[], activeZoneMinutes: any[], fatBurnActiveZoneMinutes: any[], peak: any[] ){
    setInfo([])
    if(dateTime.length==0){
    }
    else{
         for(let i=0;i<dateTime.length;i++){
    setInfo(info => [...info, [dateTime[i],activeZoneMinutes[i], fatBurnActiveZoneMinutes[i], peak[i]]])  }  
    } return(info)
    }
 
    function displayactivitylist(activeDuration: any[] , activitylevelmin: any[], activitylevelname: any[], activityname: any[],calories: any[] ,elevationgain: any[],steps: any[],distance: any[] ){
        setInfolist([])
        if(activeDuration.length==0){
        }
        else{
             for(let i=0;i<activeDuration.length;i++){
        setInfolist(infolist => [...infolist, [activeDuration[i],activitylevelmin[i], activitylevelname[i], activityname[i],calories[i],elevationgain[i],steps[i],distance[i]]])  }  
        return(infolist)
     
        }
        }
     

    return (<div><ul>{info.length == 0 ?
        <li>No datas about AZM</li> :
        <> {info.map((i, index) => (
            <li key={index}>Date : {i[0]} , Active zone minutes: {i[1]} , Fat Burn Active Zone minutes : {i[2]}, Peak Active
                Zone
                Minutes : {i[3]} </li>))}</>}
    </ul> 
    <ul>{infolist.length == 0?
            <li>No data about activity</li> :
            <> {infolist.map((i,index) => (
                <li key={index}>Date : {date}, Activity duration : {i[0]} , Activity name : {i[3]}, Activity level name: {i[2]} , Activity level duration : {i[1]}, Calories burned {i[4]},Elevation gain {i[4]}, Steps : {i[5]}, Distance : {i[6]}  </li>))}</>}
        </ul></div>)
}
export default Activity;