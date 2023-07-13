import { useEffect, useState } from 'react'
import moment from 'moment';
import "./breath.css"
import breathimage from "./public/assets/breath.png"
import pollutants from "./public/assets/pollutants.jpg"
type BreathProps = {
  date : string
  token : string
  id : string
}


function Breath({ date, token, id }: BreathProps) {
    const [br, setbr] = useState<any[]>([]); 
    const [vo2, setVo2] = useState<any[]>([]); 
    const [datebeginning, setDatebegin] =   useState(moment().format('YYYY-MM-DD')); 
    useEffect(()=>{ getbr()
        getvo2()
    },[date])

async function getbr(){

    let urlbrinter = "https://api.fitbit.com/1/user/" + id + "/br/date/"+datebeginning+"/" + date + ".json ";
    fetch(urlbrinter, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        .then(response => response.json())
        .then(data => {
            let dateTime: any[] = []
        let br: any[] = []
            if(data.br==undefined||data.br==null){
            }
            else{
       for(let item of data.br){
        dateTime.push(item.dateTime)
        br.push(item.value.breathingRate)
        console.log(data)
       }}
         brdisplay(dateTime,br)
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('Une erreur s\'est produite:', error);
        });
    
    
    
    
}
async function getvo2(){
    
let urlvo2 = "https://api.fitbit.com/1/user/" + id + "/cardioscore/date/"+datebeginning+"/" + date + ".json ";
fetch(urlvo2, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => {
        let dateTime: any[] = []
        let cardioscore: any[] = []
            if(data.cardioScore==undefined||data.cardioScore==null){
            }
            else{
       for(let item of data.cardioScore){
        dateTime.push(item.dateTime)
        cardioscore.push(item.value.vo2Max)
        console.log(data)
       }}
       vo2display(dateTime,cardioscore)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });

    

}
function brdisplay(dateTime: any[], br:any[]){
    setbr([])
    if(dateTime.length==0){
    }
    else{
         for(let i=0;i<dateTime.length;i++){
    setbr(br => [...br, [dateTime[i],br[i]]])  }  
 
    }
    }
    function vo2display(dateTime: any[], cardioScore: any[]){
        setVo2([])
        if(dateTime.length==0){
        }
        else{
             for(let i=0;i<dateTime.length;i++){
        setVo2(vo2 => [...vo2, [dateTime[i],cardioScore[i]]])  }  
     
        }
        }
        function formatLastSyncTime(lastSyncTime: string) {
            const date = new Date(lastSyncTime);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
          }
      
   return (<div id="breath"><div id="titrebreath"><img id="breathimage" alt="breath" src={breathimage}/><h1>Breath</h1></div>
    <div className="datebegin"><h2>Choose the beginning date</h2><input 
    type="date" 
    value={datebeginning} 
    onChange={(event) => setDatebegin(event.target.value)} 
  /></div>
  <ul>{br.length == 0 ?
            <li id="nobr">No data found about BR</li> :
            <> {br.map((i, index) => (
                <li id="onebr" key={index}> Breathing rate : Date & Time : formatLastSyncTime({i[0]}) <li>Breating rate : {i[1]}</li></li>))}</>}
        </ul>
        <ul>{vo2.length == 0 ?
            <li id="novo2">No data found about vo2</li> :
            <> {vo2.map((i, index) => (
                <li key={index} id="onevo2"> VO2 : Date & Time: formatLastSyncTime({i[0]})<li>Vo2 max : {i[1]} </li> </li>))}</>}</ul>
        <ul className="notdone"> <li>//Take of SABA </li><li>Quantity : </li>
        <li>//Time : </li> </ul>
        <ul className="notdone"><li>//Respiratory volume</li><li>Flow</li></ul>
<ul className="notdone"><li>//Pollutants</li> <img id="pollutantsimage" alt="pollutants" src={pollutants}/></ul>    
</div>)
}
export default Breath;