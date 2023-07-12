import { useEffect, useState } from 'react';
import moment from 'moment';
import Body from './Body';
import Devices from './Devices';
import Activity from './Activity';
import Breath from './Breath';
import Sleep from './Sleep';
import Heart from './Heart';
import "./requests.css"
type RequestsProps = {
  token : string
  id : string
}
 /*<Body date={date} token={token} id={id} />
    <Activity date={date} token={token} id={id} />
    <Breath date={date} token={token} id={id} />
    <Sleep date={date} token={token} id={id} />
    <Heart date={date} token={token} id={id} />*/
function Requests({token, id} : RequestsProps) {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD')); 

  function sendRequest() {
    return (
      <div>
    <Devices token={token} id={id} />
   
      </div>
    );
  }

  return (
    <div>
      <input id="choosedate"
        type="date" 
        value={date} 
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        onChange={(event) => setDate(event.target.value)} 
      />
      {sendRequest()}
    </div>
  );
}

export default Requests;
