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
        getvo2(),[date]
    })

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
            if(data==undefined||data==null){
            }
            else{
       for(let item of data){
        dateTime.push(item.br.dateTime)
        br.push(item.br.value.breathingRate)
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
            if(data==undefined||data==null){
            }
            else{
       for(let item of data){
        dateTime.push(item.cardioScore.dateTime)
        cardioscore.push(item.cardioScore.value.vo2Max)
        console.log(data)
       }}
       vo2display(dateTime,cardioscore)
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Une erreur s\'est produite:', error);
    });

    

}
function brdisplay(dateTime: any[] | undefined, br:any[] | undefined){
    if(dateTime==undefined||dateTime==null||br==undefined||br==null){
        setbr(["No datas about BR"])
    }
    else{
         for(let i=0;i<dateTime.length;i++){
    setbr(br => [...br, [dateTime[i],br[i]]])  }  
    return(br)
 
    }
    }
    function vo2display(dateTime: any[] | undefined, cardioScore: any[] | undefined){
        if(dateTime==undefined||dateTime==null||cardioScore==undefined||cardioScore==null){
            setVo2(["No datas about vo2"])
        }
        else{
             for(let i=0;i<dateTime.length;i++){
        setVo2(vo2 => [...vo2, [dateTime[i],cardioScore[i]]])  }  
        return(vo2)
     
        }
        }
   return (<div><input 
    type="date" 
    value={datebeginning} 
    onChange={(event) => setDatebegin(event.target.value)} 
  />
    <ul>{br.map((i)=>(<li>Breating rate : {i[1]} , Date Time : {i[0]}</li>))}</ul>
    <ul>{vo2.map((i)=>(<li>Vo2 max : {i[1]} , Date & Time: {i[0]}  </li>))}</ul>
</div>)
}
export default Breath;