import { useEffect, useState } from 'react'

type ProfileProps = {
    token : string
    id : string
  }
  

function Profile({token, id }: ProfileProps) {
const[name,setname]=useState("")
const[dateofbirth,setdateofbirth]=useState("")
useEffect(()=>{ getProfile()}
)

async function getProfile(){
let urlprofile = "https://api.fitbit.com/1/user/" + id + "/profile.json ";

fetch(urlprofile, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
       setdateofbirth(data.user.dateOfBirth)
       setname(data.user.fullName)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });
}

    return (<div>{name}, {dateofbirth}</div>)
}
export default Profile;