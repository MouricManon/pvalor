import { useEffect, useState } from 'react'
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
        return(<h1> There is no fat valor</h1>)
    }
    else{
        return(<h1>The average fat of the day is {fatdisplay()}</h1>)
    }
}
function isnullbmi(){
    if(bmi===null|| bmi===undefined){
        return(<h1> There is no bmi valor</h1>)
    }
    else{
        return(<h1>bmi :{bmi}</h1>)
    }
}
function isnullweight(){
    if(weight===null|| weight===undefined){
        return(<h1> There is no weight valor</h1>)
    }
    else{
        return(<h1>The average weight of the day is {weightdisplay()}</h1>)
    }
}
function isnulltemp(){
    if(temp===null|| temp===undefined){
        return(<h1> There is no temperature valor</h1>)
    }
    else{
        return(<h1>The average temperature of the day is {tempdisplay()}</h1>)
    }
}
    return (<div>
    <div>{isnullfat()}</div>
    <div>{isnullweight()}</div>
    <div>{isnulltemp()}</div>
    <div>{isnullbmi()}</div></div>)
}
export default Body;