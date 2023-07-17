import {useEffect, useState} from "react";
import "./generatepkce.css"

//On les exporte pour pouvoir les utiliser dans Redirect.tsx
export const clientId = "23R776";
export const clientSecret = "b5661d51bcd4b9500d34dd0cbaef75aa";
export const scope = "activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight";
export const codeverifier="246r4r3n2f475z48455l6x6d6z6g1a2z252t3f0u1c0a5s0w5w5d025j1l614m0w5g0e1p3r30550i4m4n02431c1k0x4w0i3f5y610p0c5k3w1t33150n3x3r0g3g68"
export const codechallenge="Fnq1oUEScZAhW5LexIASeK_nkAZ9nCmMfmzjDy_jxZY"
function GeneratePkce(){
    const [pkcecodechallenge, setPkcecodechallenge] = useState(codechallenge);
    const[state, setState] = useState(generateState());


    function generateState() {
        let STATE_LENGTH = 128;
        let STATE_CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
        let STATE_CHAR_SET_LENGTH = STATE_CHAR_SET.length;
        let STATE = "";

        for (let i = 0; i < STATE_LENGTH; i++) {
            STATE += STATE_CHAR_SET.charAt(Math.floor(Math.random() * STATE_CHAR_SET_LENGTH));
        }
        console.log("STATE: " + STATE);
        return STATE;
    }
   function urlredirect(){
    let url = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id="+clientId+"&scope="+scope+"&code_challenge="+pkcecodechallenge+"&code_challenge_method=S256&state="+state;
    window.open(url, "_self");
}

return(
    <div><button id="gettoken" onClick={urlredirect}>Validate the access</button></div>
)
}
export default GeneratePkce;