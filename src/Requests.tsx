import { useEffect, useState } from 'react';
import moment from 'moment';
import Body from './Body';
import Devices from './Devices';
type RequestsProps = {
  token : string
  id : string
}

function Requests({token, id} : RequestsProps) {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD')); 

  function sendRequest() {
    return (
      <div>
        <Body date={date} token={token} id={id} />
        <Devices token={token} id={id} />
      </div>
    );
  }

  return (
    <div>
      <input 
        type="date" 
        value={date} 
        onChange={(event) => setDate(event.target.value)} 
      />
      {sendRequest()}
    </div>
  );
}

export default Requests;
