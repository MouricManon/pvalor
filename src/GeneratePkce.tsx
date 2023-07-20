import {useEffect, useState} from "react";
import "./generatepkce.css"

//On les exporte pour pouvoir les utiliser dans Redirect.tsx
export const clientId = "23R776";
export const clientSecret = "ee2b8a96db5102ed99677886879ad3cb";
export const scope = "activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight";
export const codeverifier="2o4c6l6t2f326q610x4k6d2m302k491o3k1p521x564p5h553k5v3y3j452s5q1g1t3x5t635f0k2p54035f4e1y033s0z34071a06296k164z150a4u481y0x1f362n"
export const codechallenge="Buu44B3uhXRNOyumcYurcu3purrsv3M-Z97XnxoNFL4"
function GeneratePkce(){
    const [pkcecodechallenge, setPkcecodechallenge] = useState(codechallenge);
    
   function urlredirect(){
    let url = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id="+clientId+"&scope="+scope+"&code_challenge="+pkcecodechallenge+"&code_challenge_method=S256";
    window.open(url, "_self");
}

return(
    <div><button id="gettoken" onClick={urlredirect}>Validate the access</button></div>
)
}
export default GeneratePkce;