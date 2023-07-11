import { useEffect, useState } from 'react'

type DevicesProps = {
    token : string
    id : string
  }
  

function Devices({token, id }: DevicesProps) {
const[html, setHtml]=useState("")
useEffect(()=>{ getDevices()}
)

async function getDevices(){

//get devices
let urldevice = "https://api.fitbit.com/1/user/" + id + "/devices.json";

fetch(urldevice, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        // Les données récupérées sont stockées dans la variable 'data'
     let modele=[]
    let lastsync=[]
    let type=[]
       for(let device in data){
        modele.push(device.deviceVersion)
        lastsync.push(device.lastSyncTime)
        type.push(device.type)
       }
      displaydevice(modele, lastsync, type)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
}
function displaydevice(modele: string | any[] | undefined, lastsync: any[] | undefined, type: any[] | undefined){
    let htmlval = ""
    if(modele==undefined||modele==null||lastsync==undefined||lastsync==null||type==undefined||type==null){
        htmlval="No device"
        setHtml(htmlval)
    }
    else{
         for(let i=0;i<modele.length;i++){
     htmlval+=<li>Modele : {modele[i]} , Last sync :{lastsync[i]}, Type : {type[i]}</li>
     setHtml(htmlval)
       }
    return(html)
    }
    }
 

    return (<div> 
    </div>)
}
export default Devices;