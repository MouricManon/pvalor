import { useEffect, useState } from 'react'
type BodyProps = {
  date : string
}


function Body({ date }: BodyProps) {
    const [donnees, setDonnees] = useState<any>(null); 
    const [fat, setFat] = useState<any>(null); 
    useEffect(()=>{ getFat().then(r=>setFat(r))},[date])

async function getFat(){
    let access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1I3NzYiLCJzdWIiOiJCTUJDUVYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByd2VpIHJociBydGVtIiwiZXhwIjoxNjg4Njk2MTg5LCJpYXQiOjE2ODg2NjczODl9.tWQMf_F6go7x_U8JIN5XTkPjZ81MTOSqOzviaPg1VGE"
let id = "-"

// Utilisation de l'API Fetch pour effectuer une requête HTTP GET
let url = "https://api.fitbit.com/1/user/" + id + "/body/log/fat/date/" + date + ".json ";

fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
    })
    .then(response => response.json())
    .then(data => {
        // Les données récupérées sont stockées dans la variable 'data'
        console.log(data);
        //function async je lui fais un return data je le mets dans un useEffect{(()=>{ fctionasync().then(r=>setMass(r))},[date])}} 

        // Traitez les données ici
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
}
    return (<div>Je suis le fils {date}
   {(fat.length==0||fat===null) ? (<h1>There is no fat valor</h1>): (<div>{fat}</div>)}
    </div>)
}
export default Body;