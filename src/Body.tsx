import { useEffect, useState } from 'react'
import bodyimage from "./public/assets/body.png"
import "./body.css"
type BodyProps = {
  date : string
  token : string
  id : string
}


function Body({ date, token, id }: BodyProps) {
    
    const [fat, setFat] = useState<any>(null); 
    const [weight, setWeight] = useState<any>(null); 
    const [temp, setTemp] = useState<any>(null); 
    const[avgfat,setAvgfat]=useState(1)
    const[avgweight,setAvgweight]=useState(1)
    const[avgtemp,setAvgtemp]=useState(1)
    const[bmi,setbmi]=useState(1)
    useEffect(()=>{ getFat().then(r=>setFat(r)); getWeight().then(r=>setWeight(r));
    getTemp().then(r=>setTemp(r))},[date]
)

async function getFat(){

// Utilisation de l'API Fetch pour effectuer une requête HTTP GET
let url = "https://api.fitbit.com/1/user/" + id + "/body/log/fat/date/" + date + ".json ";

fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
}
async function getWeight(){
    
// Get body weight

let urlbodyweight = "https://api.fitbit.com/1/user/" + id + "/body/log/weight/date/" + date + ".json ";
fetch(urlbodyweight, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        setbmi(data.bmi)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });

}
async function getTemp(){
    
//get temperature skin

let urltemp = "https://api.fitbit.com/1/user/" + id + "/temp/skin/date/" + date + ".json ";

fetch(urltemp, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });

}
function fatdisplay(){
      let somme = 0;
  for (var i = 0; i < fat.length; i++) {
    somme += fat[i];
  }
  setAvgfat(somme / fat.length);
return (
  avgfat
)
}
function weightdisplay(){
    let somme = 0;
for (var i = 0; i < weight.length; i++) {
  somme += weight[i];
}
setAvgweight(somme / weight.length);
return (
avgweight
)
}
function tempdisplay(){
    let somme = 0;
for (var i = 0; i < temp.length; i++) {
  somme += temp[i];
}
setAvgtemp(somme / temp.length);
return (
avgtemp
)
}
function isnullfat(){
    if(fat===null|| fat===undefined){
        return(<li id="nofat"> There is no fat valor</li>)
    }
    else{
        return(<li id="onefat">The average fat of the day is {fatdisplay()}</li>)
    }
}
function isnullbmi(){
    if(bmi===null|| bmi===undefined){
        return(<li id="nobmi"> There is no bmi valor</li>)
    }
    else{
        return(<li id="onebmi">bmi :{bmi}</li>)
    }
}
function isnullweight(){
    if(weight===null|| weight===undefined){
        return(<li id="noweight"> There is no weight valor</li>)
    }
    else{
        return(<li id="oneweight">The average weight of the day is {weightdisplay()}</li>)
    }
}
function isnulltemp(){
    if(temp===null|| temp===undefined){
        return(<li id="notemp"> There is no temperature valor</li>)
    }
    else{
        return(<li id="oneweight" >The average temperature of the day is {tempdisplay()}</li>)
    }
}
    return (<div id="body"><div id="titrebody"><img id="bodyimage" alt="body" src={bodyimage}/><h1>Body</h1></div>
   <ul> {isnullfat()}
   {isnullweight()}
   {isnulltemp()}
   {isnullbmi()}</ul></div>)
}
export default Body;