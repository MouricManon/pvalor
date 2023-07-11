import { useEffect, useState } from 'react'

type DevicesProps = {
    token : string
    id : string
  }
  

function Devices({token, id }: DevicesProps) {
const[modele,setModele]=useState([])
const[lastsync,setLastsync]=useState([])
const[html, setHtml]=useState("")
const[type,setType]=useState([])
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
        for(let device of data){
       setModele(modele.concat(device.deviceVersion));
        setLastsync(lastsync.concat(device.lastSyncTime));
        setType(type.concat(device.type))}
        console.log(data)
        // Traitez les données ici
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
}
function displaydevice(){
    let htmlval = ""
  for(let i=0;i<modele.length;i++){
     htmlval+=<li>Modele : {modele[i]} , Last sync :{lastsync[i]}, Type : {type[i]}</li>
     setHtml(htmlval)
       }
    return(html)
    }

    return (<div> {displaydevice()}
    </div>)
}
export default Devices;