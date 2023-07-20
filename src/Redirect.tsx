import {useEffect, useState} from "react";
import {clientId, clientSecret, scope, codeverifier, codechallenge} from "./GeneratePkce";
import App from "./App";

function Redirect(){
    const [access_token, setAccess_token] = useState("");
    const[refresh_token, setRefresh_token] = useState("");
    useEffect(() => {
        extractCode()
    },[])

    function extractCode() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const authorizationcode = urlSearchParams.get('code');
        console.log("Code: " + authorizationcode)
        if (authorizationcode !== null) {
            getTokens(authorizationcode);
        }
    }
function getTokens(authorizationcode: string){
    if(access_token!=""){
        return;
    }
    let codeVerifier = codeverifier;
    //authorization_code : "Basic " + base64encode(client_id + ":" + client_secret)
    const url = "https://api.fitbit.com/oauth2/token";
    const headers = {
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = new URLSearchParams();
    data.append('client_id', clientId);
    data.append('grant_type', 'authorization_code');
    data.append('code', authorizationcode);
    data.append('code_verifier', codeVerifier);

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: data,
    })
        .then(response => response.json())
        .then(data => {
                setAccess_token(data.access_token);
                setRefresh_token(data.refresh_token);
                console.log("access_token: " + access_token);
                console.log("refresh_token: " + refresh_token);
                //Step 5: Use the Access Token to Call the Fitbit Web API
            }
        )
        .catch((error) => {

                console.error('Error:', error);
            }
        );
}
return(
  <div><App token={access_token} refreshtoken={refresh_token}></App></div> 
)
}
export default Redirect;