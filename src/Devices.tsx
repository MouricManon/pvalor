import { useEffect, useState } from 'react'

type DevicesProps = {
    token : string
    id : string
  }
  

function Devices({token, id }: DevicesProps) {
const[info, setInfo]=useState<any[]>([])
useEffect(()=>{ getDevices()
setInfo([0])}
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
        let modele: any[] = []
            let lastsync: any[] = []
            let type: any[] = []
       for(let device of data){
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
}function displaydevice(modele: any[] | undefined, lastsync: any[] | undefined, type: any[] | undefined){
    if(modele==undefined||modele==null||lastsync==undefined||lastsync==null||type==undefined||type==null){
        setInfo(["No device"])
    }
    else{
         for(let i=0;i<modele.length;i++){
    setInfo(info => [...info, [modele[i], lastsync[i], type[i]]])  }  
    return(info)
 
    }
    }
 

    return (<div> <ul>{info.map((i)=>(<li>Version : {i[0]} , Last sync : {i[1]} , Type : {i[2]} </li>))}</ul>
    </div>)
}
export default Devices;