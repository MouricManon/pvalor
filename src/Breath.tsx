import { useEffect, useState } from 'react'
import moment from 'moment';
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
   return (<div><input 
    type="date" 
    value={datebeginning} 
    onChange={(event) => setDatebegin(event.target.value)} 
  />
  <ul>{br.length == 0 ?
            <li>No data found about BR</li> :
            <> {br.map((i, index) => (
                <li key={index}>Breating rate : {i[1]} , Date Time : {i[0]}</li>))}</>}
        </ul>
        <ul>{vo2.length == 0 ?
            <li>No data found about vo2</li> :
            <> {vo2.map((i, index) => (
                <li key={index}>Vo2 max : {i[1]} , Date & Time: {i[0]}  </li>))}</>}</ul>
</div>)
}
export default Breath;